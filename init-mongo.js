db.createUser(
  {
    user: "admin",
    pwd: "teste123",
    roles: [
      {
        role: "readWrite",
        db: "accenture-test-db",
      }
    ]
  }
)
