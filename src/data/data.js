const folderStructureData = [
  {
    id: "folder_1",
    name: "Bharat File Upload",
    type: "folder",
    createdBy: "user123",
    createdAt: "2025-01-03T10:00:00Z",
    updatedAt: "2025-01-03T10:15:00Z",
    children: [
      {
        id: "folder_2",
        name: "Extra Data",
        type: "folder",
        createdBy: "user123",
        createdAt: "2025-01-02T10:00:00Z",
        updatedAt: "2025-01-02T10:15:00Z",
        children: [
          {
            id: "folder_3",
            name: "Test",
            type: "folder",
            createdBy: "user123",
            createdAt: "2025-01-02T11:00:00Z",
            updatedAt: "2025-01-02T11:15:00Z",
            permissions: {
              read: ["user123"],
              write: ["user123"],
            },
            children: [
              {
                id: "file_4",
                name: "cdiscpilot01_clean copy 20.pdf",
                type: "file",
                size: "4.0MB",
                owner: "Faris Awad",
                created: "Mon Oct 28 2024",
                modified: "Tue Nov 19 2024",
                projectList: ["Project1", "Project2"],
              },
              {
                id: "file_5",
                name: "cdiscpilot01_clean copy 24.pdf",
                type: "file",
                size: "4.0MB",
                owner: "Faris Awad",
                created: "Mon Oct 28 2024",
                modified: "Mon Oct 28 2024",
                projectList: ["Project3", "Project4"],
              },
            ],
          },
          {
            id: "file_19",
            name: "test19.pdf",
            type: "file",
            size: "4.0MB",
            owner: "Faris Awad",
            created: "Mon Oct 14 2024",
            modified: "Tue Nov 19 2024",
            projectList: ["Project1", "Project2"],
          },
        ],
      },
      {
        id: "folder_6",
        name: "Study XYZ-123",
        type: "folder",
        createdBy: "user456",
        createdAt: "2025-01-01T09:00:00Z",
        updatedAt: "2025-01-01T09:30:00Z",
        children: [
          {
            id: "folder_7",
            name: "Module 2.7",
            type: "folder",
            createdBy: "user456",
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:30:00Z",
            children: [
              {
                id: "folder_8",
                name: "CSR",
                type: "folder",
                createdBy: "user456",
                createdAt: "2025-01-01T11:00:00Z",
                updatedAt: "2025-01-01T11:30:00Z",
                children: [
                  {
                    id: "file_11",
                    name: "test11.pdf",
                    type: "file",
                    size: "8.0MB",
                    owner: "Faris Awad",
                    created: "Mon Oct 28 2024",
                    modified: "Mon Oct 28 2024",
                    projectList: ["Project3", "Project4"],
                  },
                  {
                    id: "file_12",
                    name: "test12.pdf",
                    type: "file",
                    size: "8.0MB",
                    owner: "Faris Awad",
                    created: "Mon Oct 28 2024",
                    modified: "Mon Oct 28 2024",
                    projectList: ["Project9", "Project8"],
                  },
                ],
              },
              {
                id: "file_9",
                name: "test9.pdf",
                type: "file",
                size: "5.0MB",
                owner: "Faris Awad",
                created: "Mon Oct 28 2024",
                modified: "Mon Oct 28 2024",
                projectList: ["Project10", "Project8"],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default folderStructureData;
