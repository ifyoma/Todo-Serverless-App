import * as AWS from 'aws-sdk'
import { TodoItem } from "../models/TodoItem";
// import * as uuid from 'uuid'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_CREATED_AT_INDEX

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    const todos = await docClient.query({
        TableName: todosTable,
        IndexName: todosIndex,
        KeyConditionExpression: 'paritionKey = :paritionKey',
        ExpressionAttributeValues: {
            ':paritionKey': userId
        }
    }).promise()

    const items = todos.Items

    return items as TodoItem[]
}

// export async function createTodo(req: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
//     const todoId = uuid.v4()

//     return undefined
// }

// export async function updateTodo() {
//     return undefined
// }

// export async function deleteTodo() {
//     return undefined
// }

// export async function createAttachmentPresignedUrl() {
//     return undefined
// }

