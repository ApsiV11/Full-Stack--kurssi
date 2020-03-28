import axios from 'axios'

const url='http://localhost:3001/persons'

const getPersons = () => {
    const request=axios.get(url)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request=axios.post(url, newPerson)
    return request.then(response => response.data)
}

const updatePerson = (index, updatedPerson) => {
    const request=axios.put(`${url}/${index}`, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (index) => {
    const request=axios.delete(`${url}/${index}`)
    return request.then(response => response.data)
}

export default {getPersons, createPerson, updatePerson, deletePerson}