"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as collectionStorage from '../lib/collections-storage';

// Define the tool type
export interface CollectionTool {
  id: number
  name: string
  description: string
  href: string
  icon: string
  tags: string[]
}

// Define the collection type
export interface Collection {
  id: number
  name: string
  items: number[] // Array of tool IDs
  createdAt: string
  updatedAt?: string
}

// Define the context type
interface CollectionsContextType {
  collections: Collection[]
  activeCollection: Collection | null
  setActiveCollection: (collectionId: number) => void
  createCollection: (name: string) => Collection | null
  deleteCollection: (collectionId: number) => void
  addToCollection: (collectionId: number, tool: CollectionTool) => boolean
  removeFromCollection: (collectionId: number, toolId: number) => boolean
  isInCollection: (collectionId: number, toolHref: string) => boolean
  getToolsInCollection: (collectionId: number) => CollectionTool[]
  isStorageAvailable: boolean
}

// Create the context with a default value
const CollectionsContext = createContext<CollectionsContextType>({
  collections: [],
  activeCollection: null,
  setActiveCollection: () => {},
  createCollection: () => null,
  deleteCollection: () => {},
  addToCollection: () => false,
  removeFromCollection: () => false,
  isInCollection: () => false,
  getToolsInCollection: () => [],
  isStorageAvailable: false
})

export function CollectionsProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [activeCollection, setActiveCollectionState] = useState<Collection | null>(null)
  const [isStorageAvailable, setIsStorageAvailable] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [toolsData, setToolsData] = useState<Record<number, CollectionTool>>({})

  // Initialize on mount
  useEffect(() => {
    const storageAvailable = collectionStorage.isStorageAvailable()
    setIsStorageAvailable(storageAvailable)
    
    if (storageAvailable) {
      const savedCollections = collectionStorage.getCollections()
      const savedToolsData = collectionStorage.getToolsData() as Record<number, CollectionTool>
      
      setCollections(savedCollections as Collection[])
      setToolsData(savedToolsData)
      
      // Set active collection to first one if available
      if (savedCollections.length > 0) {
        setActiveCollectionState(savedCollections[0] as Collection)
      }
      
      setIsInitialized(true)
    }
  }, [])

  // Create a default collection if none exist
  useEffect(() => {
    if (isInitialized && isStorageAvailable && collections.length === 0) {
      const defaultCollection = collectionStorage.addCollection("My Favorites")
      if (defaultCollection) {
        setCollections([defaultCollection as Collection])
        setActiveCollectionState(defaultCollection as Collection)
      }
    }
  }, [isInitialized, isStorageAvailable, collections.length])

  // Function to set the active collection
  const setActiveCollection = (collectionId: number) => {
    const collection = collections.find(c => c.id === collectionId) || null
    setActiveCollectionState(collection)
  }

  // Create a new collection
  const createCollection = (name: string): Collection | null => {
    if (!isStorageAvailable) return null
    
    const newCollection = collectionStorage.addCollection(name)
    if (newCollection) {
      const typedCollection = newCollection as Collection
      setCollections(prev => [...prev, typedCollection])
      return typedCollection
    }
    return null
  }

  // Delete a collection
  const deleteCollection = (collectionId: number): void => {
    if (!isStorageAvailable) return
    
    const success = collectionStorage.deleteCollection(collectionId)
    if (success) {
      setCollections(prev => prev.filter(c => c.id !== collectionId))
      
      // If active collection was deleted, set a new active collection
      if (activeCollection?.id === collectionId) {
        const remaining = collections.filter(c => c.id !== collectionId)
        setActiveCollectionState(remaining.length > 0 ? remaining[0] : null)
      }
    }
  }

  // Add a tool to a collection
  const addToCollection = (collectionId: number, tool: CollectionTool): boolean => {
    if (!isStorageAvailable) return false
    
    // Store the tool data in localStorage
    const updatedToolsData = { ...toolsData, [tool.id]: tool }
    setToolsData(updatedToolsData)
    collectionStorage.saveToolsData(updatedToolsData)
    
    const success = collectionStorage.addToCollection(collectionId, tool.id)
    if (success) {
      // Update the state
      setCollections(prev => {
        return prev.map(collection => {
          if (collection.id === collectionId) {
            return {
              ...collection,
              items: collection.items.includes(tool.id)
                ? collection.items
                : [...collection.items, tool.id]
            }
          }
          return collection
        })
      })
    }
    
    return success
  }

  // Remove a tool from a collection
  const removeFromCollection = (collectionId: number, toolId: number): boolean => {
    if (!isStorageAvailable) return false
    
    const success = collectionStorage.removeFromCollection(collectionId, toolId)
    if (success) {
      // Update the state
      setCollections(prev => {
        return prev.map(collection => {
          if (collection.id === collectionId) {
            return {
              ...collection,
              items: collection.items.filter(id => id !== toolId)
            }
          }
          return collection
        })
      })
    }
    
    return success
  }

  // Check if a tool is in a collection
  const isInCollection = (collectionId: number, toolHref: string): boolean => {
    if (!isStorageAvailable) return false
    
    const collection = collections.find(c => c.id === collectionId)
    if (!collection) return false
    
    return collection.items.some(toolId => {
      const tool = toolsData[toolId]
      return tool && tool.href === toolHref
    })
  }

  // Get all tools in a collection
  const getToolsInCollection = (collectionId: number): CollectionTool[] => {
    if (!isStorageAvailable) return []
    
    const collection = collections.find(c => c.id === collectionId)
    if (!collection) return []
    
    return collection.items
      .map(toolId => toolsData[toolId])
      .filter(Boolean) // Remove any undefined tools
  }

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        activeCollection,
        setActiveCollection,
        createCollection,
        deleteCollection,
        addToCollection,
        removeFromCollection,
        isInCollection,
        getToolsInCollection,
        isStorageAvailable
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

// Custom hook to use the collections context
export function useCollections() {
  return useContext(CollectionsContext)
}
