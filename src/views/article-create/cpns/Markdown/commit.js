import { createArticle, updateArticle } from '@/api/article'

export const createCommit = async (data, cb) => {
    await createArticle(data)
    if (cb) cb()
}
export const updateCommit = async (data, cb) => {
    await updateArticle(data)
    if (cb) cb()
}
