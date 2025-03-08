export const businessModelObj = 
[
    /**
     * Model 1
     * (1, "Lab Management")  */
    {    
    
        SuperAdmin: 
            [
                '/manage-labs',
                '/manage-lab-admin',
                '/inbox',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
        
        LabAdmin: 
            [
                '/manage-lab-receptionist',
                '/manage-lab-employee',
                '/manage-department',
                '/manage-test',
                '/manage-test-parameters',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            LabReceptionist:[
                '/manage-patient',
                '/patient-report-status',
                '/reports',
                '/transactions',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            LabEmployee:[
                '/manage-tests',
                "/profile",
                "/change-password",
                "/help-desk",
            ]
        
    },

    /**
     * Model 2
     * (2, "Pharmacy Management")  */

    {    
        SuperAdmin: 
            [
                '/manage-pharmacy',
                '/pharmacy-admin',
                '/inbox',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            
        
        PharmacyAdmin:
        [
            '/dashboard',
            '/manage-supplier',
            '/purchase-order',
            '/manage-medicines',
            '/expiry-medicines',
            '/issue-medicine',
            "/profile",
            "/change-password",
            "/help-desk",
        ]
    },

    /**
     * Model 3
     * (3, "Lab and Pharmacy Management")  
     * 
     * */

        {    
            SuperAdmin:  
                [
                    '/manage-labs',
                    '/manage-lab-admin',
                    '/manage-pharmacy',
                    '/pharmacy-admin',
                    '/inbox',
                    '/announcement',
                    "/profile",
                    "/change-password",
                    "/help-desk",
                ],
                LabAdmin: 
                [
                    '/manage-lab-receptionist',
                    '/manage-lab-employee',
                    '/manage-department',
                    '/manage-test',
                    '/manage-test-parameters',
                    "/profile",
                    "/change-password",
                    "/help-desk",
                ],
                LabReceptionist:[
                    '/manage-patient',
                    '/patient-report-status',
                    '/reports',
                    '/transactions',
                    "/profile",
                    "/change-password",
                    "/help-desk",
                ],
                LabEmployee:[
                    '/manage-tests',
                    "/profile",
                    "/change-password",
                    "/help-desk",
                ],
            
            PharmacyAdmin:
            [
                '/dashboard',
                '/manage-supplier',
                '/purchase-order',
                '/manage-medicines',
                '/expiry-medicines',
                '/issue-medicine',
                "/profile",
                "/change-password",
                "/help-desk",
            ]
        },

        
    /**
     * Model 4
     * (4, "Hospital Management") 
     * 
     * */

    {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],


            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                '/patient-vitals', 
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                // '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
        
     
    },
    /**
     * Model 5
     * (5, "Lab and Hospital Management") 
     * 
     * */

    {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                '/manage-labs',
                '/manage-lab-admin',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                // '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                '/patient-vitals', 
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabAdmin: 
            [
                '/manage-lab-receptionist',
                '/manage-lab-employee',
                '/manage-department',
                '/manage-test',
                '/manage-test-parameters',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabReceptionist:[
                '/manage-patient',
                '/patient-report-status',
                '/reports',
                '/transactions',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabEmployee:[
                '/manage-tests',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
    },
     /**
     * Model 6
     * (6, Pharmacy and Hospital Management):
     * 
     * */

     {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                '/manage-pharmacy',
                '/pharmacy-admin',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                // '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                '/patient-vitals',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            PharmacyAdmin:
            [
                '/dashboard',
                '/manage-supplier',
                '/purchase-order',
                '/manage-medicines',
                '/expiry-medicines',
                '/issue-medicine',
                "/profile",
                "/change-password",
                "/help-desk",
            ]
    },

      /**
     * Model 7
     * (7, Lab, Pharmacy, and Hospital Management)
     * 
     * */

      {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                '/manage-pharmacy',
                '/pharmacy-admin',
                '/manage-labs',
                '/manage-lab-admin',
                "/profile",
                "/change-password",
                "/help-desk",
                
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                 '/patient-history',
                // '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                '/patient-vitals', 
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            PharmacyAdmin:
            [
                '/dashboard',
                '/manage-supplier',
                '/purchase-order',
                '/manage-medicines',
                '/expiry-medicines',
                '/issue-medicine',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabAdmin: 
            [
                '/manage-lab-receptionist',
                '/manage-lab-employee',
                '/manage-department',
                '/manage-test',
                '/manage-test-parameters',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabReceptionist:[
                '/manage-patient',
                '/patient-report-status',
                '/reports',
                '/transactions',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabEmployee:[
                '/manage-tests',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
    },
       /**
     * Model 8
     * (8, Hospital and In-Patient Management)
     * 
     * */

       {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                "/manage-surgery",
                '/manage-slots',
                '/manage-doctor',
                "/bed-status",
                '/manage-appointment',
                '/patient-info',
                "/inpatient-allocation",
                "/discharge-summary",
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                "/mange-blocks",
                "/manage-rooms",
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                "/lab-reports" ,
                '/patient-vitals', 
                "/inpatients",
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                "/bed-status",
                '/patient-info',
                '/patient-payments',
                "/inpatient-allocation",
                "/discharge-summary",
                "/profile",
                "/change-password",
                "/help-desk",
            ],

    },

       /**
     * Model 9
     * (9, Lab, Hospital, and In-Patient Management)
     * 
     * */

       {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                "/manage-surgery",
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                "/inpatient-allocation",
                "/discharge-summary",
                '/bookings-history',
                "/bed-status",
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                "/mange-blocks",
                "/manage-rooms",
                '/manage-labs',
                '/manage-lab-admin',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                "/lab-reports" ,
                '/patient-vitals', 
                "/inpatients",
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                "/bed-status",
                '/patient-payments',
                "/inpatient-allocation",
                "/discharge-summary",
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabAdmin: 
            [
                '/manage-lab-receptionist',
                '/manage-lab-employee',
                '/manage-department',
                '/manage-test',
                '/manage-test-parameters',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabReceptionist:[
                '/manage-patient',
                '/patient-report-status',
                '/reports',
                '/transactions',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabEmployee:[
                '/manage-tests',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
    },

      /**
     * Model 10
     *(10, Pharmacy, Hospital, and In-Patient Management)
     * 
     * */

      {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                "/manage-surgery",
                "/bed-status",
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                "/inpatient-allocation",
                "/discharge-summary",
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                "/mange-blocks",
                "/manage-rooms",
                '/manage-pharmacy',
                '/pharmacy-admin',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                "/lab-reports" ,
                '/patient-vitals', 
                "/inpatients",
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                "/bed-status",
                '/patient-info',
                '/patient-payments',
                "/inpatient-allocation",
                "/discharge-summary",
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            PharmacyAdmin:
            [
                '/dashboard',
                '/manage-supplier',
                '/purchase-order',
                '/manage-medicines',
                '/expiry-medicines',
                '/issue-medicine',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
  
    },

       /**
     * Model 11
     * (11, Lab, Pharmacy, Hospital, and In-Patient Management)
     * 
     * */

     {    
        SuperAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/hospital',
                '/hospital-admin',
                '/announcement',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            HospitalAdmin: 
            [
                '/dashboard',
                '/inbox',
                '/guest-doctor',
                "/manage-surgery",
                '/manage-slots',
                '/manage-doctor',
                '/manage-appointment',
                '/patient-info',
                "/inpatient-allocation",
                "/bed-status",
                "/discharge-summary",
                '/bookings-history',
                '/canceled-slot',
                '/manage-charges',
                '/daily-transactions',
                '/patient-payments',
                '/staff-management',
                "/mange-blocks",
                "/manage-rooms",
                '/manage-pharmacy',
                '/pharmacy-admin',
                '/manage-labs',
                '/manage-lab-admin',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            Doctor:[
                '/dashboard',
                '/bookings-history',
                '/direct-approach',
                '/patient-appointments',
                '/today-appointment',
                '/patient-history',
                '/Inpatient-health-matrix',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Nurse:[
                "/lab-reports" ,
                '/patient-vitals', 
                "/inpatients",
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            Receptionist:[
                '/manage-appointment',
                '/patient-info',
                '/patient-payments',
                "/inpatient-allocation",
                "/bed-status",
                "/discharge-summary",
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            LabAdmin: 
            [
                '/manage-lab-receptionist',
                '/manage-lab-employee',
                '/manage-department',
                '/manage-test',
                '/manage-test-parameters',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabReceptionist:[
                '/manage-patient',
                '/patient-report-status',
                '/reports',
                '/transactions',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            LabEmployee:[
                '/manage-tests',
                "/profile",
                "/change-password",
                "/help-desk",
            ],

            PharmacyAdmin:
            [
                '/dashboard',
                '/manage-supplier',
                '/purchase-order',
                '/manage-medicines',
                '/expiry-medicines',
                '/issue-medicine',
                "/profile",
                "/change-password",
                "/help-desk",
            ],
            
  
    },
]



export const  allUrlLink = [
    "/dashboard",
    "/pharmacy-admin",
    "/inbox",
    "/manage-appointment",
    "/manage-doctor",
    "/bookings-history",
    "/canceled-slot",
    "/guest-doctor",
    "/manage-slots",
    "/manage-labs",
    "/manage-charges",
    "/manage-lab-admin",
    "/lab-reports",
    "/patient-info",
    "/daily-transactions",
    "/patient-payments",
    "/mange-blocks",
    "/manage-rooms",
    "/inpatient-allocation",
    "/bed-status",
    "/manage-surgery",
    "/staff-management",
    "/profile",
    "/change-password",
    "/help-desk",
    "/manage-pharmacy",
    "/check-doctor-availability",
    "/patient-information",
    '/my-bookings',
    "/patient-payments",
    "/update-bookings",
    "/patient-vitals",
    "/inbox",
    "/hospital",
    "/hospital-admin",
    "/announcement",
    "/manage-medicines",
    "/expiry-medicines",
    "/manage-supplier",
    "/purchase-order",
    "/issue-medicine",
    "/out-patients",
    "/manage-booking",
    "/today-appointment",
    "/patient-history",
    "/Inpatient-health-matrix",
    "/view-medicine",
    "/online-patient-history",
      "/patient-appointments",
    "/direct-approach",
    "/manage-lab-receptionist",
    "/manage-lab-employee",
    "/manage-department",
    // "/manage-methods",
    "/manage-test",
    "/manage-test-parameters",
    "/manage-tests",
    "/manage-slots",
    "/discharge-summary",
    '/manage-patient',
    "/patient-report-status",
    "/reports",
    "/transactions",
    "/inpatients",
    "/patient-information",
    '/my-bookings',
    "/patient-payments",
    "/update-bookings",
  ]

