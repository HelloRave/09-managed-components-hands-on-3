import React from 'react'

export default function User(props) {
    return (
        <React.Fragment>
            <div class="box">
                {props.user._id === props.userBeingEdited ? (
                    <div>
                        <input
                            type="text"
                            name="editedUserName"
                            onChange={props.updateFormField}
                            value={props.editedUserName}
                        />
                    </div>
                ) : (
                    <h3>{props.user.name}</h3>
                )}
                {props.user._id === props.userBeingEdited ? (
                    <div>
                        <input
                            type="text"
                            name="editedUserEmail"
                            onChange={props.updateFormField}
                            value={props.editedUserEmail}
                        />
                    </div>
                ) : (
                    <h4>{props.user.email}</h4>
                )}
                {props.user._id === props.userBeingEdited ? (
                    <div>
                        <button
                            onClick={() => {
                                props.confirmEdit(props.user);
                            }}
                        >
                            Confirm
                        </button>
                        <button onClick={props.cancelEdit}>Cancel edit</button>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={() => {
                                props.beginEdit(props.user);
                            }}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => {
                                props.deleteUser(props.user);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}