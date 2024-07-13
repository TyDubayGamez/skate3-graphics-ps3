const imagesPerPage = 500;
let currentPage = 0;
let imageUrls = [];

// Function to fetch and parse image URLs from multiple HTML files
async function fetchImageUrlsFromHtml() {
    const files = ['Graphicsp1.html', 'Graphicsp2.html', 'Graphicsp3.html', 'Graphicsp4.html', 'Graphicsp5.html', 'Graphicsp6.html', 'Graphicsp7.html', 'Graphicsp8.html', 'Graphicsp9.html', 'Graphicsp10.html', 'Graphicsp11.html', 'Graphicsp12.html', 'Graphicsp13.html', 'Graphicsp14.html', 'Graphicsp15.html', 'Graphicsp16.html', ]; // Add more files as needed
    for (const file of files) {
        console.log(`Fetching from ${file}`);
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch image URLs from ${file}: ${response.statusText}`);
            }
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const imgElements = doc.querySelectorAll('img');
            imageUrls.push(...Array.from(imgElements).map(img => img.src));
        } catch (error) {
            console.error(error);
        }
    }
    console.log('Image URLs fetched:', imageUrls); // Debugging line
}

// Render images and handle pagination
function renderImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const start = currentPage * imagesPerPage;
    const end = Math.min(start + imagesPerPage, imageUrls.length);

    for (let i = start; i < end; i++) {
        const img = document.createElement('img');
        img.src = imageUrls[i];
        img.alt = 'pic';
        gallery.appendChild(img);
    }

    // Update button states
    document.getElementById('prev').disabled = currentPage === 0;
    document.getElementById('next').disabled = end >= imageUrls.length;

    // Update the page number display
    const totalPages = Math.ceil(imageUrls.length / imagesPerPage);
    document.getElementById('page-number').textContent = `Page ${currentPage + 1} of ${totalPages}`;
}

// Pagination functions
function nextPage() {
    const totalPages = Math.ceil(imageUrls.length / imagesPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderImages();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderImages();
    }
}

function goToPage() {
    const inputPage = parseInt(document.getElementById('page-input').value);
    const totalPages = Math.ceil(imageUrls.length / imagesPerPage);
    
    if (inputPage >= 1 && inputPage <= totalPages) {
        currentPage = inputPage - 1; // Convert to 0-based index
        renderImages();
    } else {
        alert(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
}

// Fetch image URLs and initialize gallery
fetchImageUrlsFromHtml().then(() => {
    renderImages();
}).catch(error => {
    console.error('Error initializing gallery:', error);
});
