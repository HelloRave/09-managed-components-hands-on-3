import React from "react";
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

  renderAddUser() {
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="User name"
          value={this.state.newUserName}
          onChange={this.updateFormField}
          name="newUserName"
        />
        <input
          type="text"
          placeholder="User email"
          value={this.state.newUserEmail}
          onChange={this.updateFormField}
          name="newUserEmail"
        />
        <button onClick={this.addUser}>Add</button>
      </React.Fragment>
    );
  }

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
            <React.Fragment>
              <div class="box">
                {user._id === this.state.userBeingEdited ? (
                  <div>
                    <input
                      type="text"
                      name="editedUserName"
                      onChange={this.updateFormField}
                      value={this.state.editedUserName}
                    />
                  </div>
                ) : (
                  <h3>{user.name}</h3>
                )}
                {user._id === this.state.userBeingEdited ? (
                  <div>
                    <input
                      type="text"
                      name="editedUserEmail"
                      onChange={this.updateFormField}
                      value={this.state.editedUserEmail}
                    />
                  </div>
                ) : (
                  <h4>{user.email}</h4>
                )}
                {user._id === this.state.userBeingEdited ? (
                  <div>
                    <button
                      onClick={() => {
                        this.confirmEdit(user);
                      }}
                    >
                      Confirm
                    </button>
                    <button onClick={this.cancelEdit}>Cancel edit</button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        this.beginEdit(user);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        this.deleteUser(user);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
        {this.renderAddUser()}
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
      users: [...this.state.slice(0, index), ...this.state.slice(index + 1)]
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
