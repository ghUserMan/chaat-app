const users = []

// addUser, removeUser, getUser, retUsersInRoom

//* id это нечно связанное с конкретным сокетом
const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data

    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // validate username
    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    // store user
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1) {
        // тут получается массив из одного элемента (удаляемого)
        return users.splice(index, 1)[0]
    }
}



module.exports = {
    addUser
}

addUser({
    id: 1,
    username: '   ffDd',
    room: 'sSs'
})

console.log(users)

const res = addUser({
    id: 2,
    username: ' ffDtd  ',
    room: 'sSs'
})

console.log(res)

const rem = removeUser(2)

console.log('removed', rem)
console.log(users)