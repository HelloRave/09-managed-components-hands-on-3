import React from "react";
import AddUser from "./components/AddUser";
import User from "./components/User";
import "./styles.css";

export default class App extends React.Component {
  state = {
    users: [
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Jon Snow",
        email: "jonsnow@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Ned Stark",
        email: "nedstark@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Frodo Baggins",
        email: "frodo@bagend.com"
      }
    ],
    newUserName: "",
    newUserEmail: "",
    userBeingEdited: 0,
    editedUserName: "",
    editedUserEmail: ""
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.users.map((user) => {
          return (
            <User user={user}
                  userBeingEdited={this.state.userBeingEdited}
                  updateFormField={this.updateFormField}
                  editedUserName={this.state.editedUserName}
                  editedUserEmail={this.state.editedUserEmail}
                  confirmEdit={this.confirmEdit}
                  cancelEdit={this.cancelEdit}
                  beginEdit={this.beginEdit}
                  deleteUser={this.deleteUser}/>
          );
        })}
        <AddUser newUserName={this.state.newUserName}
                 newUserEmail={this.state.newUserEmail}
                 updateFormField={this.updateFormField}
                 addUser={this.addUser}/>
      </div>
    );
  }

  addUser = () => {
    // // 1. clone the original array
    // let cloned = [...this.state.users];

    // // 2. add to the back of the clone
    // cloned.push({
    //   _id: Math.floor(Math.random() * 10000),
    //   name: this.state.newUserName,
    //   email: this.state.newUserEmail
    // });

    // // 3. set the clone back into the state
    // this.setState({
    //   users: cloned
    // });

    // short cut
    this.setState({
      users: [
        ...this.state.users,
        {
          _id: Math.floor(Math.random() * 10000),
          name: this.state.newUserName,
          email: this.state.newUserEmail
        }
      ]
    });
  };

  beginEdit = (user) => {
    this.setState({
      userBeingEdited: user._id,
      editedUserEmail: user.email,
      editedUserName: user.name
    });
  };

  deleteUser = (user) => {
    // // 1. clone the original array
    // let cloned = [...this.state.users];

    // // 2. find the index of the user we want to delete
    // let index = this.state.users.findIndex((u) => u._id === user._id);

    // // 3. remove from the cloned array
    // cloned.splice(index, 1);

    // // 4. set the cloned array to replace the original array in the state
    // this.setState({
    //   users: cloned
    // });

    let index = this.state.users.findIndex((u) => u._id === user._id);
    this.setState({
      users: [...this.state.users.slice(0, index), ...this.state.users.slice(index + 1)]
    });
  };

  cancelEdit = () => {
    this.setState({
      userBeingEdited: 0
    });
  };

  confirmEdit = (user) => {
    // 1. clone the array
    // let cloned = [...this.state.users];

    // // 2. create a new user based on the edits
    // let editUser = {
    //   ...user,
    //   email: this.state.editedUserEmail,
    //   name: this.state.editedUserName
    // };

    // // 3. find the index of the original user
    // let index = this.state.users.findIndex((u) => u._id === user._id);

    // // 4. put the new user into the cloned array
    // cloned[index] = editUser;

    // // 5. set the cloned array back into the state
    // this.setState({
    //   users: cloned,
    //   userBeingEdited: 0
    // });

    let index = this.state.users.findIndex((u) => u._id === user._id);
    this.setState({
      users: [
        ...this.state.users.slice(0, index),
        {
          ...user,
          email: this.state.editedUserEmail,
          name: this.state.editedUserName
        },
        ...this.state.users.slice(index + 1)
      ],
      userBeingEdited: 0
    });
  };
}
