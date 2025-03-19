import request from "supertest";
import app from "../src/app";

describe("Employee API", () => {
    let employeeId: string;

    it("should create a new employee", async () => {
        const response = await request(app)
            .post("/api/v1/routes")
            .send({
                name: "John Doe",
                position: "Software Engineer",
                department: "IT",
                email: "johndoe@example.com",
                phone: "1234567890",
                branchId: "1"
            });

        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        employeeId = response.body.data.id;
    });

    it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/routes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    it("should get an employee by ID", async () => {
        const response = await request(app).get(`/api/v1/routes/${employeeId}`);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(employeeId);
    });

    it("should update an employee", async () => {
        const response = await request(app)
            .put(`/api/v1/routes/${employeeId}`)
            .send({ position: "Senior Engineer" });

        expect(response.status).toBe(200);
        expect(response.body.data.position).toBe("Senior Engineer");
    });

    it("should delete an employee", async () => {
        const response = await request(app).delete(`/api/v1/routes/${employeeId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Employee Deleted");
    });

    it("should return 404 for a non-existing employee", async () => {
        const response = await request(app).get("/api/v1/routes/non-existing-id");
        expect(response.status).toBe(404);
    });
});
