import axios from 'axios'

export const fetchPerCategory = (async (category: string) => {
    try {
        const response = await axios.get('/api/feed', {params:
        {category: category}})
        return response.data
    }
    catch (error) {
        console.error(error)
        console.log("Check express.js server. Possible malfunctioning GET.")
    }
})

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get('/api/categories')
        return response.data;
    }
    catch (error) {
        console.error(error)
        console.log("Check express.js server. Possible malfunctioning GET.")
    }
}