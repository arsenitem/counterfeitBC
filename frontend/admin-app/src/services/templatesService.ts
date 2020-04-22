import { ITemplate } from "../models";
import {callApi} from '../utils/callApi'
import {endpoints} from '../apiConfig'
import {mockTemplates} from './mockData/templates'

export class TemplatesService{
    constructor (private accessToken: string) {}

    public async getTemplates(): Promise<ITemplate[]> {
        await new Promise(res => setTimeout(res, 1000))
        return mockTemplates

        const templatesRes = await callApi(endpoints.templates, this.accessToken)
        if (!templatesRes.ok) {
            throw new Error('')
        }
        const templates = await templatesRes.json()
        return templates.map((t: any) => ({
            ...t
        }))

    }

    public async createTemplate(template: ITemplate): Promise<string> {
        await new Promise(res => setTimeout(res, 1000))
        return Math.random() * 100 + 'template'

        const templatesRes = await callApi(endpoints.templates, this.accessToken, 'POST')
        if (!templatesRes.ok) {
            throw new Error('')
        }
        const templateId = await templatesRes.json()
        return templateId
    }

    public async deleteTemplate(templateId: string): Promise<void> {
        await new Promise(res => setTimeout(res, 500))
        return

        const templatesRes = await callApi(`${endpoints.templates}?templateId=${templateId}`, this.accessToken, 'DELETE')
        if (!templatesRes.ok) {
            throw new Error('')
        }
    }

    public async updateTemplate(template: ITemplate): Promise<void> {
        await new Promise(res => setTimeout(res, 1000))
        return 

        const body = {
            template
        }
        const templatesRes = await callApi(endpoints.templates, this.accessToken, 'PATCH', body)
        if (!templatesRes.ok) {
            throw new Error('')
        }
    }





    
    public async archiveTemplate(templateId: string, isArchived: boolean): Promise<void> {
        await new Promise(res => setTimeout(res, 1000))
        return 

        const templatesRes = await callApi(endpoints.templates, this.accessToken)
        if (!templatesRes.ok) {
            throw new Error('')
        }
    }

    public async setTemplateVisibility(templateId: string, isVisible: boolean): Promise<void> {
        await new Promise(res => setTimeout(res, 500))
        return 

        const templatesRes = await callApi(endpoints.templates, this.accessToken)
        if (!templatesRes.ok) {
            throw new Error('')
        }
    }

    public async publishTemplate(templateId: string): Promise<void> {
        await new Promise(res => setTimeout(res, 500))
        return 

        const templatesRes = await callApi(endpoints.templates, this.accessToken)
        if (!templatesRes.ok) {
            throw new Error('')
        }
    }
}