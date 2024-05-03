document.getElementById("downloadButton").addEventListener("click", function() {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.text("Sadguru Ashram Shala, Shere", 10, 20);
    doc.setFontSize(16);
    doc.text("Mark Sheet", 10, 30);

    // Get marksheet content
    const marksheet = document.querySelector('.marksheet');
    const marksheetData = {
        rollNumber: marksheet.querySelector('p:nth-child(1)').textContent.split(':')[1].trim(),
        name: marksheet.querySelector('p:nth-child(2)').textContent.split(':')[1].trim(),
        uniqueId: marksheet.querySelector('p:nth-child(3)').textContent.split(':')[1].trim(),
        subjects: [],
        totalMarks: marksheet.querySelector('.total').textContent.trim().split(':')[1].trim()
    };

    // Iterate through subjects
    const subjectRows = marksheet.querySelectorAll('table tr');
    for (let i = 1; i < subjectRows.length; i++) {
        const cells = subjectRows[i].querySelectorAll('td');
        marksheetData.subjects.push({
            name: cells[0].textContent.trim(),
            obtainedMarks: cells[1].textContent.trim(),
            totalMarks: cells[2].textContent.trim()
        });
    }

    // Generate marksheet content
    let y = 40;
    doc.setFontSize(12);
    doc.text(`Roll Number: ${marksheetData.rollNumber}`, 10, y);
    y += 10;
    doc.text(`Name: ${marksheetData.name}`, 10, y);
    y += 10;
    doc.text(`Unique ID: ${marksheetData.uniqueId}`, 10, y);
    y += 10;
    doc.autoTable({
        startY: y,
        head: [['Subject', 'Obtained Marks', 'Total Marks']],
        body: marksheetData.subjects.map(subject => [subject.name, subject.obtainedMarks, subject.totalMarks])
    });

    // Add total marks
    y = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Obtained Marks: ${marksheetData.totalMarks}`, 10, y);

    // Generate and download PDF
    doc.save("marksheet.pdf");
});
