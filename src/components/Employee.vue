<template>
  <div>
    <!-- SEARCH BAR -->
    <v-toolbar flat>
      <v-text-field
        v-model="search"
        class="w-auto mr-4"
        label="Search Employees"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        hide-details
        single-line
        dense
        style="max-width: 300px;"
      ></v-text-field>

      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" @click="openDialog" dark small v-bind="attrs" v-on="on">Add new Employee</v-btn>
        </template>

        <!-- DIALOG FOR NEW USER -->
        <v-card>
          <v-card-title>
            <span class="text-h6 m-2">New User/Employee</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_name"
                    label="User Name*"
                    prepend-icon="mdi-account"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_email"
                    label="Email*"
                    prepend-icon="mdi-email"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_address"
                    label="Address"
                    prepend-icon="mdi-map-marker"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_contact_number"
                    label="Contact Number"
                    prepend-icon="mdi-phone"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_birthdate"
                    label="Birthdate"
                    type="date"
                    prepend-icon="mdi-calendar"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.user_department"
                    :items="['Kitchen', 'Human Resources', 'Cashier']"
                    label="Department"
                    prepend-icon="mdi-office-building"
                    required
                    dense
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.user_salary"
                    label="Salary"
                    prepend-icon="mdi-currency-php"
                    required
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.user_status"
                    :items="['PAID', 'UNPAID', 'PENDING']"
                    label="Status"
                    prepend-icon="mdi-checkbox-marked-circle-outline"
                    required
                    dense
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="black" text @click="saveNewUser">Save User</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <!-- TABLE -->
    <v-data-table
      :search="search"
      :headers="headers"
      :items="employee"
      dense
      class="elevation-0"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.user_id }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.user_department }}</td>
          <td>{{ item.user_contact_number }}</td>
          <td>{{ item.user_salary }}</td>
          <td>{{ item.user_status }}</td>
          <td>
            <v-icon class="me-2" size="small" color="black" @click="openSalaryDialog(item)">mdi-information</v-icon>
            <v-icon class="me-2" size="small" color="black" @click="editUser(item)">mdi-pencil</v-icon>
            <v-icon size="small" color="black" @click="deleteUser(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- EDIT USER DIALOG -->
    <v-dialog v-model="editUserDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h6 m-2">Edit Employee</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.user_name"
                  label="Employee Name*"
                  prepend-icon="mdi-account"
                  required
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.user_contact_number"
                  label="Contact Number*"
                  prepend-icon="mdi-phone"
                  required
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                  <v-select
                    v-model="editedItem.user_department"
                    :items="['Kitchen', 'Human Resources', 'Cashier']"
                    label="Department"
                    prepend-icon="mdi-office-building"
                    required
                    dense
                    hide-details
                  ></v-select>
                </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.user_salary"
                  label="Salary*"
                  prepend-icon="mdi-currency-php"
                  required
                  dense
                  hide-details
                ></v-text-field>
              </v-col>
               <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.user_status"
                  :items="['UNPAID', 'PAID', 'PENDING']"
                  label="Status"
                  prepend-icon="mdi-checkbox-marked-circle-outline"
                  required
                  dense
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="closeEditUserDialog">Cancel</v-btn>
          <v-btn color="black" text @click="saveEditedUser">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--DIALOG FOR EMPLOYEE SALARY-->
    <v-dialog v-model="salaryDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="text-h6 m-2">HISTORY OF SALARY</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="salaryHeaders"
                  :items="filteredSalaryHistory"
                  item-key="user_id"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.user_id }}</td>
                      <td>{{ item.user_name }}</td>
                      <td>{{ item.user_department }}</td>
                      <td>{{ item.user_salary }}</td>
                      <td>{{ item.user_status }}</td>
                      <td>{{ item.user_date_given }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="closeSalaryDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    


  </div>
  
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      editUserDialog: false,
      salaryDialog: false,
      search: '',
      editedItem: {
        user_name: '',
        user_email: '',
        user_address: '',
        user_contact_number: '',
        user_birthdate: '',
        user_department: '',
        user_salary: '',
        user_status: '',
      },
      headers: [
        { title: 'Employee ID', align: 'start', key: 'user_id' },
        { title: 'Employee Name', align: 'start', key: 'user_name' },
        { title: 'Department', align: 'start', key: 'user_department' },
        { title: 'Contact Number', key: 'user_contact_number' },
        { title: 'Salary', key: 'user_salary' },
        { title: 'Status', key: 'user_status' },
        { title: 'Actions', sortable: false },
      ],
      salaryHeaders: [
        { title: 'Employee ID', align: 'start', key: 'user_id'},
        { title: 'Employee Name', align: 'start', key: 'user_name'},
        { title: 'Department', align: 'start', key: 'user_department'},
        { title: 'Salary', key: 'user_salary'},
        { title: 'Status', key: 'user_status'},
        { title: 'DATE GIVEN', key: 'user_date_given'}
      ],
      salaryHistory: [
        {
          user_id: '1',
          user_name: 'Ferdinand Espiritu',
          user_department: 'Kitchen',
          user_salary: '10,000',
          user_status: 'PAID',
          user_date_given: '05/13/2024'
        },
        {
          user_id: '1',
          user_name: 'Ferdinand Espiritu',
          user_department: 'Kitchen',
          user_salary: '90,000',
          user_status: 'PAID',
          user_date_given: '05/21/2024',
        },
        {
          user_id: '2',
          user_name: 'Denmark Lobo',
          user_department: 'Cashier',
          user_salary: '21,000',
          user_status: 'PAID',
          user_date_given: '05/13/2024'
        },
      ],
      filteredSalaryHistory: [],
      employee: [
        {
          user_id: '1',
          user_name: 'Ferdinand Espiritu',
          user_department: 'Kitchen',
          user_contact_number: '09668109204',
          user_salary: '90,000',
          user_status: 'PENDING',
        },
        {
          user_id: '2',
          user_name: 'Denmark Lobo',
          user_department: 'Cashier',
          user_contact_number: '09668109204',
          user_salary: '21,000',
          user_status: 'PENDING',
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveNewUser() {
      const newId = this.employee.length + 1;
      const newUser = { ...this.editedItem, user_id: newId.toString() };
      this.employee.push(newUser);
      this.closeDialog();
      this.resetForm();
    },
    resetForm() {
      this.editedItem = {
        user_name: '',
        user_email: '',
        user_address: '',
        user_contact_number: '',
        user_birthdate: '',
        user_department: '',
        user_salary: '',
        user_status: '',
      };
    },
    updateStatus(item) {
      console.log('Status updated for:', item);
    },
    editUser(item) {
      this.editedItem = { ...item };
      this.editUserDialog = true;
    },
    closeEditUserDialog() {
      this.editUserDialog = false;
    },
    saveEditedUser() {
      const index = this.employee.findIndex(emp => emp.user_id === this.editedItem.user_id);
      if (index !== -1) {
        this.employee.splice(index, 1, this.editedItem);
      }
      this.closeEditUserDialog();
    },
    deleteUser(item) {
      this.employee = this.employee.filter(emp => emp.user_id !== item.user_id);
    },
    openSalaryDialog(item) {
      this.filteredSalaryHistory = this.salaryHistory.filter(history => history.user_id === item.user_id);
      this.salaryDialog = true;
    },
    closeSalaryDialog() {
      this.salaryDialog = false;
    },
  },
};
</script>

<style scoped>
.v-text-field, .v-select {
  margin-bottom: 8px;
}

.v-dialog .v-card {
  border-radius: 8px;
}

.v-card-title {
  padding: 8px 16px;
}

.v-card-actions {
  padding: 8px 16px;
}

.v-btn {
  margin: 4px 0;
}

.v-icon {
  cursor: pointer;
  margin-right: 8px;
}

/* Custom style to remove border from v-select in the table */
.status-dropdown .v-input__control {
  border: none;
  box-shadow: none;
}

.status-dropdown {
  background: none;
}
</style>
