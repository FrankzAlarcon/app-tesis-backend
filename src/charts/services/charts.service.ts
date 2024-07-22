import { Injectable } from '@nestjs/common';

@Injectable()
export class ChartsService {
  async getDashboardData() {
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales 2021',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Sales 2020',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }
      ]
    }
  }

  async downloadReport() {
    return {
      filename: 'report.pdf',
      url: 'http://localhost:3000/reports/report.pdf'
    }
  }
}
