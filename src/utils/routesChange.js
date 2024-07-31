export const clearChildrenRoute = (Routes) => {
    const childrenPaths = getChildrenPaths(Routes)
    const resRoutes = removeSame(Routes, childrenPaths)
    const menuList = getMenuList(resRoutes)
    const res = mergeSameParentRoute(menuList)
    return res
}

//获取所有子路由
export const getChildrenPaths = (Routes) => {
    const childrenRoutes = []
    Routes.forEach((item) => {
        if (item.children.length > 0) {
            childrenRoutes.push(
                ...item.children.map((citem) => {
                    return citem.path
                })
            )
        }
    })
    return childrenRoutes
}
//获取所有子路由及title
export const getChildrenRouteSearch = (Routes) => {
    const childrenRoutes = []
    Routes.forEach((item) => {
        if (item.children.length > 0) {
            childrenRoutes.push(
                ...item.children.map((citem) => {
                    return {
                        path: citem.path,
                        title: citem.meta.title
                    }
                })
            )
        }
    })
    return childrenRoutes
}
//去除所有重复子路由
const removeSame = (Routes, childrenPaths) => {
    const res = Routes.filter((item) => {
        return !childrenPaths.find((citem) => {
            return citem === item.path
        })
    })
    return res
}

//去除所有不需要在菜单栏展示的路由
const getMenuList = (Routes) => {
    const menuList = Routes.filter((item) => {
        if (JSON.stringify(item.meta) === '{}' && item.children.length === 0) return false
        if (JSON.stringify(item.meta) === '{}' && item.children.length > 0) {
            item.children = removeChildrenList(item.children)
            return true
        }
        if (JSON.stringify(item.meta) !== '{}' || item.children.length > 0) {
            item.children = removeChildrenList(item.children)
            return true
        }
    })
    return menuList
}

// 去除子列表中不需要展示的路由
const removeChildrenList = (Routes) => {
    const res = []
    Routes.forEach((item, index) => {
        if (item.meta.title && item.meta.icon) {
            res.push(Routes[index])
            return
        }
    })
    return res
}

// 相同父路由合并
const mergeSameParentRoute = (Routes) => {
    const res = []
    Routes.forEach((item) => {
        let index = 0
        if (
            !res.find((j, i) => {
                index = i
                return j.path === item.path
            })
        ) {
            res.push(item)
        } else {
            res[index].children.push(...item.children)
        }
    })
    return res
}
