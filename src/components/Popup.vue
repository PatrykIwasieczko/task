<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="success">Add a new employee</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a new employee</h2>
      </v-card-title>
      <v-form class="px-3" ref="form">
        <v-text-field label="Name" v-model="employee.name" prepend-icon="mdi-account"></v-text-field>
        <v-text-field
          label="Surname"
          v-model="employee.surname"
          prepend-icon="mdi-clipboard-account"
        ></v-text-field>
        <v-text-field label="Department" v-model="employee.department" prepend-icon="mdi-briefcase"></v-text-field>
        <v-text-field label="Salary" v-model="employee.salary" prepend-icon="mdi-currency-usd"></v-text-field>
        <v-text-field label="Currency" v-model="employee.currency" prepend-icon="mdi-currency-usd"></v-text-field>

        <v-spacer></v-spacer>

        <v-btn class="success mx-0 mt-3" @click="submit" :loading="loading">Add employee</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  data() {
    return {
      employee: {
        name: null,
        surname: null,
        department: null,
        salary: null,
        currency: null
      },
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const employee = {
          name: this.employee.name,
          surname: this.employee.surname,
          department: this.employee.department,
          salary: this.employee.salary,
          currency: this.employee.currency
        };
        db.collection("employees")
          .add(employee)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            Toast.fire({
              type: "success",
              title: "Employee added."
            });
          })
          .then(() => this.reset());
      }
    },
    reset() {
      this.employee = {
        name: null,
        surname: null,
        department: null,
        salary: null,
        currency: null,
        createdAt: null
      };
    }
  }
};
</script>
