
export default {
    path: '/article',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/article/ranking',
    name: 'articleRanking',
    meta: { title: 'article', icon: 'article' },
    children: [
        {
            path: '/article/ranking',
            component: () => import('@/views/article-ranking/index.vue'),
            meta: {
                title: 'articleRanking',
                icon: 'article-ranking'
            }
        },
        {
            path: '/article/:id',
            component: () => import('@/views/article-detail/index.vue'),
            meta: {
                title: 'articleDetail'
            }
        }
    ]
}
