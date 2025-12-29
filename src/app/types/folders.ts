import { ResourceType } from './resources'

export interface Folder {
    id: string
    owner_id: string
    name: string
    resource_type: ResourceType
    created_at: string
}

export interface FolderItem {
    id: string
    folder_id: string
    resource_id: string
    resource_type: ResourceType
    created_at: string
}
