import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const setToken = (newToken) =>{
  token = `bearer ${newToken}`
}


const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  //console.log('blogs.js newObject: ' + newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject,config)
  console.log("update")

  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  console.log("remove")

  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove }