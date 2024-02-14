import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { updateRecord } from "lightning/uiRecordApi";

const FIELDS = ['User.FirstName', 'User.LastName', 'User.Email', 'User.User_Role__c', 'User.User_Status__c']; // Add more fields as needed

export default class EditUser extends LightningElement {
    @api userId; // The Id of the user to edit
    user = {};

    @wire(getRecord, { recordId: '$userId', fields: FIELDS })
    wiredUser({ error, data }) {
        if (data) {
            this.user = {
                FirstName: data.fields.FirstName.value,
                LastName: data.fields.LastName.value,
                Email: data.fields.Email.value,
                User_Role__c: data.fields.User_Role__c.value,
                User_Status__c: data.fields.User_Status__c.value
            };
        } else if (error) {
            console.error('Error fetching user details:', error);
        }
    }

    handleFirstNameChange(event) {
        this.user.FirstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.user.LastName = event.target.value;
    }

    handleEmailChange(event) {
        this.user.FirstName = event.target.value;
    }

    handleRoleChange(event) {
        this.user.LastName = event.target.value;
    }

    handleStatusChange(event) {
        this.user.FirstName = event.target.value;
    }

    closeEvent(){
      const selectedEvent = new CustomEvent("closemodalforEdit", { detail: false });

      // Dispatches the event.
      this.dispatchEvent(selectedEvent);
    }

    handleSave() {
        const fields = {};
        fields.Id = this.recordId;
        fields.FirstName = this.user.FirstName;
        fields.LastName = this.user.LastName;
        fields.Email = this.user.Email;
        fields.User_Role__c = this.user.LastName;
        fields.User_Status__c = this.user.User;

        const recordInput = { fields };
        console.log('recordInput -- '+JSON.stringify(recordInput));
        updateRecord(recordInput)
            .then(() => {
                // Handle success
                console.log('User details updated successfully');
                this.closeEvent();
            })
            .catch(error => {
                // Handle error
                console.error('Error updating user details:', error);
                this.error = 'Error updating user details';
            });
    }
}
