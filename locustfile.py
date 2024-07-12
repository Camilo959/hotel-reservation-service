import json
from locust import HttpUser, TaskSet, task, between

# Leer los datos de Mockaroo
with open('data.json') as f:
    mock_data = json.load(f)

class ReservationTasks(TaskSet):
    @task(1)
    def create_reservation(self):
        reservation = mock_data.pop(0) if mock_data else None
        if reservation:
            self.client.post("/api/reservations", json=reservation)

    @task(2)
    def get_reservations(self):
        self.client.get("/api/reservations")

    @task(1)
    def update_reservation(self):
        if mock_data:
            reservation = mock_data[0]
            self.client.put(f"/api/reservations/{reservation['id']}", json={
                "status": "updated"
            })

    @task(1)
    def delete_reservation(self):
        if mock_data:
            reservation = mock_data[0]
            self.client.delete(f"/api/reservations/{reservation['id']}")

class WebsiteUser(HttpUser):
    tasks = [ReservationTasks]
    wait_time = between(1, 5)
    host = "http://localhost:3000"
