import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = { description: '', list: '' }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPedding = this.handleMarkAsPedding.bind(this)

        this.refresh()
    }

    refresh() {
        axios.get(`${URL}?sort=createAt`)
            .then(resp => this.setState({ ...this.state, description: '', list: resp.data }))
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(() => this.refresh())
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleRemove(id) {
        axios.delete(`${URL}/${id}`)
            .then(() => this.refresh())
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(() => this.refresh())
    }

    handleMarkAsPedding(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(() => this.refresh())
    }

    render() {
        return (
            <div>
                <PageHeader name="Tasks" small="Register" />
                
                <TodoForm
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd} />

                <TodoList
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPedding={this.handleMarkAsPedding} />
            </div>
        )
    }
}