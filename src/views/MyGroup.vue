<script setup lang="ts" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
import { ref, computed } from 'vue'

const search = ref('')
const dialog = ref(false)
const isEditing = ref(false)
const currentStudent = ref({
  id: '',
  fullName: '',
  birthYear: 0,
  phone: '',
  email: ''
})

const headers = [
  { title: 'ПІП', key: 'fullName', align: 'start' },
  { title: 'Рік народження', key: 'birthYear' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Email', key: 'email' },
  { title: 'Дії', key: 'actions', align: 'end', sortable: false }
]

const students = ref([
  {
    id: '1',
    fullName: 'John Smith',
    birthYear: 1990,
    phone: '+1234567890',
    email: 'john.smith@example.com'
  },
  {
    id: '2',
    fullName: 'Mary Johnson',
    birthYear: 1992,
    phone: '+1234567891',
    email: 'mary.johnson@example.com'
  },
  {
    id: '3',
    fullName: 'Robert Brown',
    birthYear: 1988,
    phone: '+1234567892',
    email: 'robert.brown@example.com'
  },
  {
    id: '4',
    fullName: 'Emily Davis',
    birthYear: 1995,
    phone: '+1234567893',
    email: 'emily.davis@example.com'
  },
  {
    id: '5',
    fullName: 'Michael Wilson',
    birthYear: 1993,
    phone: '+1234567894',
    email: 'michael.wilson@example.com'
  }
])

const filteredStudents = computed(() => {
  if (!search.value) return students.value
  const searchLower = search.value.toLowerCase()
  return students.value.filter(student =>
    student.fullName.toLowerCase().includes(searchLower) ||
    student.birthYear.toString().includes(searchLower) ||
    student.phone.toLowerCase().includes(searchLower) ||
    student.email.toLowerCase().includes(searchLower)
  )
})

const openAddDialog = () => {
  isEditing.value = false
  currentStudent.value = {
    id: '',
    fullName: '',
    birthYear: 0,
    phone: '',
    email: ''
  }
  dialog.value = true
}

const editStudent = (item: any) => {
  isEditing.value = true
  currentStudent.value = { ...item }
  dialog.value = true
}

const saveStudent = () => {
  if (currentStudent.value.fullName && currentStudent.value.birthYear) {
    if (isEditing.value) {
      const index = students.value.findIndex(s => s.id === currentStudent.value.id)
      if (index !== -1) {
        students.value[index] = { ...currentStudent.value }
      }
    } else {
      students.value.push({
        id: Date.now().toString(),
        fullName: currentStudent.value.fullName,
        birthYear: currentStudent.value.birthYear,
        phone: currentStudent.value.phone,
        email: currentStudent.value.email
      })
    }
    dialog.value = false
  }
}

const deleteStudent = (id: string) => {
  students.value = students.value.filter(student => student.id !== id)
}
</script>

<template>
  <v-card title="Students" flat>
    <template v-slot:text>
      <v-row>
        <v-col cols="12" sm="auto">
          <v-btn color="success" prepend-icon="mdi-plus" @click="openAddDialog">
            Create Student
          </v-btn>
        </v-col>
      </v-row>
      <v-text-field
        v-model="search"
        label="Search students"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="mt-4"
      ></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="filteredStudents">
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="primary"
            icon="mdi-pencil"
            size="small"
            @click="editStudent(item)"
          ></v-icon>
          <v-icon
            color="error"
            icon="mdi-delete"
            size="small"
            @click="deleteStudent(item.id)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
      <v-card
        :title="isEditing ? 'Update info' : 'Create new student'"
        :subtitle="isEditing ? 'Update info about student' : 'Enter the details of the new student'"
      >
        <template v-slot:text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentStudent.fullName"
                label="ПІП"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.number="currentStudent.birthYear"
                label="Рік народження"
                variant="outlined"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="currentStudent.phone"
                label="Телефон"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="currentStudent.email"
                label="Email"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </template>
        <v-card-actions>
          <v-btn text="Cancel" color="error" variant="plain" @click="dialog = false"></v-btn>
          <v-spacer></v-spacer>
          <v-btn text="Save" color="success" @click="saveStudent"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>

</style>