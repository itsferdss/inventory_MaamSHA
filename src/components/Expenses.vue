<template>
  <div>
    <!-- SEARCH BAR -->
    <v-toolbar flat>
      <v-text-field
        v-model="search"
        class="w-auto mr-4"
        label="Search Products"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        style="max-width: 300px;"
      ></v-text-field>

      <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ props }">
          <v-btn @click="openDialog" color="black" dark v-bind="props">Add new Expense</v-btn>
        </template>

        <!--DIALOG FOR NEW USER-->
        <v-card>
          <v-card-title>
            <span class="text-h6 m-2">New Expense</span>
            <v-divider></v-divider>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.expense_amount" label="Expense Amount*" prepend-icon="mdi-currency-php" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.expense_category" label="Expense Category*" prepend-icon="mdi-tag" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.expense_type" label="Expense Type" prepend-icon="mdi-wallet" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.user_id" label="User ID (if SALARY)" prepend-icon="mdi-account" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="editedItem.expense_date" label="Date Issued" type="date" prepend-icon="mdi-calendar" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-btn color="black" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="black" text @click="saveNewExpense">Save User</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <!--TABLE-->
    <v-data-table
      :search="search"
      :headers="headers"
      :items="expense"
      :sort-by="[{ key: 'userId', order: 'asc' }]">

      <!--Content of Table-->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.expense_id }}</td>
          <td>{{ item.expense_amount }}</td>
          <td>{{ item.expense_category }}</td>
          <td>{{ item.expense_type }}</td>
          <td>{{ item.expense_date }}</td>
          <td>
            <v-icon size="small" style="color: #2F3F64" @click="openMoreInfoDialog(item)">mdi-information</v-icon>
            <v-icon size="small" style="color: #2F3F64" @click="deleteExpense(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

     <v-dialog v-model="moreInfoDialog" max-width="1300px">
      <v-card>
        <v-card-title>Expense Information</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-4">
                  <v-card-title>Expense Details</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div v-if="selectedExpense">
                      <p><strong>Expense ID:</strong> {{ selectedExpense.expense_id }}</p>
                      <p><strong>Amount:</strong> {{ selectedExpense.expense_amount }}</p>
                      <p><strong>Category:</strong> {{ selectedExpense.expense_category }}</p>
                      <p><strong>Type:</strong> {{ selectedExpense.expense_type }}</p>
                      <p><strong>Date:</strong> {{ selectedExpense.expense_date }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-4">
                  <v-card-title>User Information</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div v-if="selectedUser">
                      <p><strong>User Name:</strong> {{ selectedUser.user_name }}</p>
                      <p><strong>Department:</strong> {{ selectedUser.user_department }}</p>
                      <p><strong>Contact Number:</strong> {{ selectedUser.user_contact_number }}</p>
                      <p><strong>Salary:</strong> {{ selectedUser.user_salary }}</p>
                      <p><strong>Status:</strong> {{ selectedUser.user_status }}</p>
                    </div>
                    <div v-else>
                      <p>No user information available for this expense.</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-btn color="primary" @click="closeMoreInfoDialog">Close</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      dialog: false,
      moreInfoDialog: false,
      editedItem: {
        user_name: '',
        user_email: '',
        user_address: '',
        user_contact_number: '',
        user_birthdate: '',
        user_department: '',
        user_salary: '',
        user_status: '',
        expense_id: '',
        expense_amount: '',
        expense_category: '',
        expense_type: '',
        expense_date: '',
      },

      headers: [
        { title: 'Expense ID', align: 'start', key: 'expense_id' },
        { title: 'Expense Amount', align: 'start', key: 'expense_amount' },
        { title: 'Expense Category', align: 'start', key: 'expense_category' },
        { title: 'Expense Type', key: 'expense_type' },
        { title: 'DATE ISSUED', key: 'expense_date' },
        { title: 'Actions', sortable: false },
      ],

      expense: [
        {
          expense_id: '1',
          expense_amount: '10,000',
          expense_category: 'Salary',
          expense_type: 'Cash',
          expense_date: '05/13/2003',
          user_id: '1',
        },
        {
          expense_id: '2',
          expense_amount: '10,000',
          expense_category: 'Credit',
          expense_type: 'Card',
          expense_date: '05/13/2020',
          user_id: '',
        },
      ],
      employee: [
        {
          user_id: '1',
          user_name: 'Ferdinand Espiritu',
          user_department: 'Kitchen',
          user_contact_number: '09668109204',
          user_salary: '90,000',
          user_status: 'PAID',
        },
        
      ],
      selectedExpense: null,
      selectedUser: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveNewExpense() {
    const { expense_amount, expense_category, expense_type, expense_date, user_id } = this.editedItem;

    if (!expense_amount || !expense_category || !expense_type || !expense_date) {
      alert('Please fill in all required fields.');
      return;
    }

    const newExpenseId = this.expense.length ? (parseInt(this.expense[this.expense.length - 1].expense_id) + 1).toString() : '1';

    const newExpense = {
      expense_id: newExpenseId,
      expense_amount,
      expense_category,
      expense_type,
      expense_date,
      user_id: user_id || '',
    };

    this.expense.push(newExpense);
    this.closeDialog();
    this.resetForm();
    },
    deleteExpense(item) {
    // Confirm deletion
    if (confirm(`Are you sure you want to delete the expense with ID ${item.expense_id}?`)) {
      // Filter out the expense to be deleted
      this.expense = this.expense.filter(exp => exp.expense_id !== item.expense_id);
    }
  },
    openMoreInfoDialog(item) {
      this.selectedExpense = item;
      this.selectedUser = this.employee.find(emp => emp.user_id === item.user_id) || null;
      this.moreInfoDialog = true;
    },
    closeMoreInfoDialog() {
      this.moreInfoDialog = false;
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
