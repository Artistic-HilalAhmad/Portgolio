import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// A4 dimensions: 210 x 297 mm
const margin = 15;
const pageWidth = 210 - margin * 2; // 180mm
let y = 16;

// Header
doc.setFont('Helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(24, 43, 73); // Deep slate navy
doc.text('Hilal Ahmad Najar', 105, y, { align: 'center' });

y += 6;
doc.setFont('Helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(70, 80, 95);
doc.text('Programmer Analyst, Bitwise Solutions, Pune', 105, y, { align: 'center' });

y += 5;
doc.setFontSize(9.5);
doc.setTextColor(40, 50, 65);
const contactText = 'Phone: 7780921703   |   Email: hilalahmad456@gmail.com   |   LinkedIn: linkedin.com/in/hilal-ahmad-32a39211b';
doc.text(contactText, 105, y, { align: 'center' });

y += 4;
doc.setDrawColor(200, 210, 225);
doc.setLineWidth(0.5);
doc.line(margin, y, 210 - margin, y);

// Helper for Section Titles
function addSectionTitle(title) {
  y += 7;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(24, 43, 73);
  doc.text(title, margin, y);
  y += 2;
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + 45, y);
  y += 4;
}

// Professional Summary
addSectionTitle('Professional Summary');
doc.setFont('Helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(50, 60, 75);
const summary = 'Results-driven Data Engineer with 5 years of experience building scalable ELT/ETL pipelines across GCP and Snowflake. Proficient in leveraging modern data stack technologies including dbt, Kubernetes, BigQuery, Composer (Airflow), Cloud SQL, and Pub/Sub. Proven track record of architecting robust data models (including Iceberg and CDC tracking), automating multi-environment schemas, and delivering high-impact solutions through effective cross-functional collaboration.';
const summaryLines = doc.splitTextToSize(summary, pageWidth);
doc.text(summaryLines, margin, y);
y += summaryLines.length * 4.2;

// Skills & Abilities
addSectionTitle('Skills & Abilities');
doc.setFontSize(9.5);
const skills = [
  { label: 'GCP & Cloud: ', val: 'Kubernetes, Docker, BigQuery, Composer, Pub/Sub, Cloud SQL, Snowflake, dbt, Redis' },
  { label: 'Languages: ', val: 'Python, Java, SQL' },
  { label: 'Tools & Frameworks: ', val: 'Apache Airflow, GitHub, VSTS, Jenkins, Eclipse, VS Code' },
];

skills.forEach(s => {
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(30, 40, 55);
  doc.text('•  ' + s.label, margin, y);
  const labelWidth = doc.getTextWidth('•  ' + s.label);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(60, 70, 85);
  doc.text(s.val, margin + labelWidth, y);
  y += 4.5;
});

// Experience
addSectionTitle('Experience');

const expItems = [
  {
    role: 'Data Engineer Level 2',
    company: 'Bitwise Solutions, Pune',
    dates: 'Apr 2025 – Present',
    bullets: [
      'Built production dbt + Snowflake (Iceberg) ELT pipeline for merchant underwriting data, implementing 100+ incremental models with CDC-based history tracking, enforced data contracts, and multi-environment schema automation across dev/QA/cert/prod.',
      'Migrated production applications from Google App Engine to Kubernetes clusters, improving scalability, deployment flexibility, and infrastructure maintainability.',
      'Maintained 99.9% uptime and ensured seamless data delivery through reliable pipeline integrations.',
    ]
  },
  {
    role: 'Data Engineer Level 1',
    company: 'Bitwise Solutions, Pune',
    dates: 'Apr 2022 – Mar 2025',
    bullets: [
      'Designed and implemented a robust data quality and auditing framework to monitor Cloud Composer, Dataflow, and BigQuery jobs, enabling proactive detection of anomalies and improving overall pipeline reliability.',
      'Automated DAG dependency management in Composer—achieved a 95% on-time job completion rate.',
      'Mentored junior developers on GCP best practices and ETL design patterns.',
    ]
  },
  {
    role: 'Trainee Programmer',
    company: 'Bitwise Solutions, Pune',
    dates: 'Sep 2021 – Mar 2022',
    bullets: [
      'Developed batch ETL processes in GCP using Python and Unix shell—handled nightly loads of 500M+ records.',
      'Scheduled and monitored Dataflow jobs through Composer—ensured round-the-clock pipeline reliability.',
      'Implemented BigQuery transformations with schema evolution and consistency checks.',
    ]
  }
];

expItems.forEach((exp) => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(24, 43, 73);
  doc.text(exp.role + '  |  ' + exp.company, margin, y);
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(70, 80, 95);
  doc.text(exp.dates, 210 - margin, y, { align: 'right' });
  
  y += 4.5;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 60, 75);

  exp.bullets.forEach((bullet) => {
    const lines = doc.splitTextToSize('•  ' + bullet, pageWidth - 3);
    doc.text(lines, margin + 2, y);
    y += lines.length * 4;
  });
  y += 1.5;
});

// Education
addSectionTitle('Education');
const eduItems = [
  { degree: 'Masters in Computer Applications (MCA)', inst: 'Jammu University', dates: 'Aug 2017 – Oct 2020', score: 'CGPA: 8.2' },
  { degree: 'Bachelor in Computer Applications (BCA)', inst: 'Kashmir University', dates: 'Mar 2014 – Mar 2017', score: 'Percentage: 71.2%' }
];

eduItems.forEach(e => {
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(24, 43, 73);
  doc.text(e.degree + ' — ' + e.inst, margin, y);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 80, 95);
  doc.text(e.dates + '   |   ' + e.score, 210 - margin, y, { align: 'right' });
  y += 4.5;
});

// Awards & Recognition
addSectionTitle('Awards & Recognition');
const awards = [
  'Excellence Award, Bitwise Solutions (December 2022) – For consistent demonstration of technical and collaborative excellence.',
  'Shout Out, Bitwise Solutions (Feb 2025) – Recognized for building the Automated Data Quality Validation Utility.'
];

awards.forEach(a => {
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 60, 75);
  const lines = doc.splitTextToSize('•  ' + a, pageWidth - 3);
  doc.text(lines, margin + 2, y);
  y += lines.length * 4;
});

const outputDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfPath = path.join(outputDir, 'Hilal_Ahmad_Najar_Resume.pdf');
const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync(pdfPath, Buffer.from(pdfOutput));

console.log('Successfully generated resume PDF at:', pdfPath);
