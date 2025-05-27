import { relations } from 'drizzle-orm'
import {
  pgTable,
  integer,
  uuid,
  text,
  timestamp,
  pgEnum
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey()
})

// Define relations for users to clinics
export const userToClinics = pgTable('user_to_clinics', {
  userID: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clinicID: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, { onDelete: 'cascade' }),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const userToClinicsRelations = relations(userToClinics, ({ one }) => ({
  user: one(users, {
    fields: [userToClinics.userID],
    references: [users.id]
  }),
  clinic: one(clinicsTable, {
    fields: [userToClinics.clinicID],
    references: [clinicsTable.id]
  })
}))

export const clinicsTable = pgTable('clinics', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text().notNull(),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').defaultNow().notNull()
})
// Define relations for clinicsTable
export const clinicRelationsTable = relations(clinicsTable, ({ many }) => ({
  doctors: many(doctorsTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  userToClinics: many(userToClinics)
}))

export const doctorsTable = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text().notNull(),
  avatarImageUrl: text('avatar_image_url'),
  specialty: text('specialty').notNull(),
  //1 - monday, 2 - tuesday, 3 - wednesday, 4 - thursday, 5 - friday, 6 - saturday, 7 - sunday
  availableFromWeekday: integer('available_from_weekday').notNull(), //1
  availableToWeekday: integer('available_to_weekday').notNull(), //5
  availableFromTime: text('available_from_time').notNull(), //08:00
  availableToTime: text('available_to_time').notNull(), //18:00
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, { onDelete: 'cascade' }),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

// Define relations for doctorsTable
export const doctorRelationsTable = relations(doctorsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [doctorsTable.clinicId],
    references: [clinicsTable.id]
  })
}))

export const patientGenderEnum = pgEnum('patient_gender', [
  'male',
  'female',
  'other'
])

export const patientsTable = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  birthDate: text('birth_date').notNull(), // YYYY-MM-DD
  gender: patientGenderEnum('patient_gender').notNull(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id, { onDelete: 'cascade' }),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

// Define relations for patientsTable
export const patientRelationsTable = relations(patientsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    fields: [patientsTable.clinicId],
    references: [clinicsTable.id]
  })
}))

export const appointmentsTable = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp('date').notNull(), // YYYY-MM-DD HH:mm:ss
  clinicID: uuid('clinic_id')
    .notNull()
    .references(() => clinicsTable.id),
  doctorID: uuid('doctor_id').references(() => doctorsTable.id),
  patientID: uuid('patient_id').references(() => patientsTable.id),
  createAt: timestamp('create_at').defaultNow(),
  updateAt: timestamp('update_at')
    .defaultNow()
    .$onUpdate(() => new Date())
})

// Define relations for appointmentsTable
export const appointmentRelationsTable = relations(
  appointmentsTable,
  ({ one }) => ({
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicID],
      references: [clinicsTable.id]
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorID],
      references: [doctorsTable.id]
    }),
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientID],
      references: [patientsTable.id]
    })
  })
)
