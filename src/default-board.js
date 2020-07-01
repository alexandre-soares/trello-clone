import { uuid } from './utils'

export default {
    name: 'workshop',
    columns: [
        {
            name: 'todo',
            tasks: [
                {
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus dui et est molestie, sed euismod odio ullamcorper. ',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'second task',
                    id: uuid(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'and thrid',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        },
        {
            name: 'in-progress',
            tasks: [
                {
                    description: '',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        },
        {
            name: 'done',
            tasks: [
                {
                    description: '',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        }
    ]
}
