import React from 'react';

export default class ToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: "Please enter your To Do Item",
            items: [],
            item: "",
            selectedItemId: "",
            buttonLabel: "Save"
        }
    }

    saveItem = (evt) => {
        evt.preventDefault();
        if (evt.target.id === "") {
            this.addItem();
        } else {
            this.updateItem(evt);
        }
    }

    addItem() {
        const itemList = this.state.item !== "" ? [...this.state.items, { label: this.state.item, id: new Date().getTime() }] : this.state.items;
        this.setState({ items: itemList });
        this.setState({ item: "" });
    }
    updateItem(evt) {
        const items = this.state.items.map(item => {
            if (item.id === Number(evt.target.id)) {
                item["label"] = this.state.item;
                return item;
            }
            return item;
        });
        this.setState({
            items: items,
            item: "",
            selectedItemId: "",
            buttonLabel: "Save"
        });

    }

    onItemChange = (evt) => {
        evt.preventDefault();
        this.setState({ item: evt.target.value });
    }

    deleteAll = () => {
        this.setState({ items: [] });
    }

    deleteItem = (evt) => {
        evt.preventDefault();
        const items = this.state.items.map(item => (item.id !== Number(evt.target.id)) && item);
        this.setState({ items: items });
    }

    editItem = (evt) => {
        evt.preventDefault();
        const item = this.state.items.find(item => {
            console.log(item.id, evt.target.id);
            return item.id === Number(evt.target.id);
        });
        this.setState({ selectedItemId: item.id })
        this.setState({ item: item.label });
        this.setState({ buttonLabel: "Update" });
    }

    render() {
        return (
            <div>

                <input type="text" placeholder={this.state.placeholder} name="item" value={this.state.item} onChange={(evt) => this.onItemChange(evt)} />
                <button type="submit" onClick={(evt => this.saveItem(evt))} id={this.state.selectedItemId}>{this.state.buttonLabel}</button>
                <ul>
                    {
                        this.state.items.map((item, i) => {
                            return item && (<li key={i}>{item.label}<button onClick={(evt => this.editItem(evt))} id={item.id} >Edit</button><button id={item.id} onClick={(evt) => this.deleteItem(evt)}>Delete</button></li>)
                        })
                    }
                </ul>
                <button onClick={this.deleteAll}>Delete All</button>

            </div>
        )
    }


}