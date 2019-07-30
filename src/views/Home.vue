<template>
  <v-container class="my-5">
    <Popup />
    <v-layout row wrap>
      <v-flex md3 xs12 class="mt-3 pl-3">
        <v-text-field prepend-icon="mdi-magnify" v-model="search" label="Search by name"></v-text-field>
      </v-flex>
      <v-flex md3 offset-md1 xs12 class="pl-3">
        <v-select
          v-model="department"
          :items="listDepartments"
          multiple
          chips
          hint="Search by employee department"
          persistent-hint
        ></v-select>
      </v-flex>

      <v-flex md4 xs12 offset-md1 class="px-4 mt-3">
        <h5>Search by salary</h5>
        <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center">
          <template v-slot:prepend>
            <v-text-field
              v-model="range[0]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              v-model="range[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
            ></v-text-field>
          </template>
        </v-range-slider>
      </v-flex>
    </v-layout>
    <v-card flat v-for="employee in foundEmployees" :key="employee.surname">
      <v-layout row wrap :class="`pa-3 ml-1 employee ${employee.department}`">
        <v-flex xs12 md6>
          <div class="caption grey--text">Employee name</div>
          <div>{{ employee.name }}</div>
        </v-flex>

        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Employee surname</div>
          <div>{{ employee.surname }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Department</div>
          <div>{{ employee.department }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Salary</div>
          <div>{{ `${employee.salary} ${employee.currency}` }}</div>
        </v-flex>
      </v-layout>
    </v-card>

    <v-layout class="my-4 pt-4">
      <h2>Salary by department</h2>
    </v-layout>
    <v-layout class="my-4 py-4">
      <v-flex xs6 sm4 md3>
        <v-select
          v-model="salaryByDepartment"
          :items="listDepartments"
          label="Department"
          hint="Select employee department"
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex xs6 sm4 md2 offset-sm1>
        <div class="caption grey--text">{{ salaryByDepartment }}</div>
        <div>{{ showDepartment }}</div>
      </v-flex>

      <v-flex xs6 sm4 md2 offset-md1 class="ml-3">
        <div class="caption grey--text">Total salary</div>
        <div>{{ totalSalary }}</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4"></v-layout>
  </v-container>
</template>

<script>
import Popup from "../components/Popup";

import { db } from "../firebase";
export default {
  components: { Popup },
  data() {
    return {
      employees: [],
      department: ["IT"],
      salaryByDepartment: "IT",
      search: "",
      min: 0,
      max: 20000,
      slider: 100,
      range: [2000, 7000]
    };
  },
  methods: {},
  computed: {
    foundEmployees() {
      return this.employees.filter(employee => {
        return (
          this.department
            .map(department => department.toLowerCase())
            .includes(employee.department.toLowerCase()) &&
          (employee.salary >= this.range[0] &&
            employee.salary <= this.range[1]) &&
          (employee.name.toLowerCase().match(this.search.toLowerCase()) ||
            employee.surname.toLowerCase().match(this.search.toLowerCase()))
        );
      });
    },
    totalSalary() {
      let total = 0;
      this.employees.filter(employee => {
        total += parseFloat(employee.salary);
      });
      return `${total} PLN`;
    },
    showDepartment() {
      let obj = this.employees.filter(employee => {
        return this.salaryByDepartment
          .toLowerCase()
          .includes(employee.department.toLowerCase());
      });
      let item;
      let sum = 0;
      for (item of obj) {
        sum += parseFloat(item.salary);
      }
      return `${sum} PLN`;
    },
    listDepartments() {
      return [
        ...new Set(this.employees.map(employee => employee.department))
      ].sort();
    }
  },
  created() {
    db.collection("employees").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.employees.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<style>
.employee {
  border-left: 4px solid tomato;
}
.employee.IT {
  border-left: 4px solid #32cd32;
}
.employee.Administracja {
  border-left: 4px solid #191970;
}
.employee.Handlowiec {
  border-left: 4px solid #ffaa2c;
}
</style>