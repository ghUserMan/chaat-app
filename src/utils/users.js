const users = []

// addUser, removeUser, getUser, getUsersInRoom

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

const getUser = (id) => {
    // ищем пользователя я массиве
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    // достаём список участников комнаты
    room = room.trim().toLowerCase() // как быть тут с неопределённым значением?
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
