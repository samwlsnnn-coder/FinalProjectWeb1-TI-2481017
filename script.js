// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- LOGIC HALAMAN CONTACT US ---
    const regForm = document.getElementById('regForm');
    
    if (regForm) {
        const alertBox = document.getElementById('alertMsg');

        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil Value
            const fullname = document.getElementById('fullname').value.trim();
            const nim = document.getElementById('nim').value.trim();
            const email = document.getElementById('email').value.trim();
            const faculty = document.getElementById('faculty').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const address = document.getElementById('address').value.trim();
            const phone = document.getElementById('phone').value.trim();

            let errors = [];

            // Validasi Sederhana
            if (!fullname) errors.push("Full Name is required.");
            if (!nim) errors.push("NIM is required.");
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) errors.push("Invalid email address.");

            if (!faculty) errors.push("Please select a faculty.");
            if (!dob) errors.push("Date of birth is required.");
            if (!gender) errors.push("Please select a gender.");
            if (!address) errors.push("Address is required.");

            const phonePattern = /^[0-9]+$/;
            if (!phone || !phonePattern.test(phone)) {
                errors.push("Phone must be numeric.");
            } else if (phone.length < 10) {
                errors.push("Phone min 10 digits.");
            }

            // Tampilkan Pesan
            if (errors.length > 0) {
                showAlert(alertBox, errors.join('<br>'), 'error');
            } else {
                showAlert(alertBox, `Success! Registration for ${fullname} complete.`, 'success');
                regForm.reset(); 
            }
        });
    }

    // --- LOGIC HALAMAN POSTS ---
    const postsContainer = document.getElementById('postsContainer');
    
    if (postsContainer) {
        // Ganti URL sesuai kebutuhan (misal pakai ID NIM jika diminta dosen)
        // const url = 'https://jsonplaceholder.typicode.com/posts/23'; 
        const url = 'https://jsonplaceholder.typicode.com/posts'; 

        const loading = document.getElementById('loading');

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(data => {
                loading.style.display = 'none';
                
                // Jika data array (banyak), ambil 9 saja. Jika object (satu), jadikan array.
                const postsData = Array.isArray(data) ? data.slice(0, 9) : [data];
                
                let allCardsHTML = '';

                postsData.forEach(post => {
                    allCardsHTML += `
                        <div class="bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-300 flex flex-col h-full overflow-hidden border border-gray-100">
                            <div class="p-6 flex flex-col flex-grow">
                                <div class="flex justify-between items-center mb-3">
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        POST #${post.id}
                                    </span>
                                </div>
                                <h2 class="text-lg font-bold text-gray-800 mb-2 capitalize">${post.title}</h2>
                                <p class="text-gray-600 text-sm flex-grow">${post.body}</p>
                            </div>
                        </div>
                    `;
                });

                postsContainer.innerHTML = allCardsHTML;
            })
            .catch(error => {
                loading.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
            });
    }
});

// Fungsi Helper untuk Alert
function showAlert(element, message, type) {
    element.innerHTML = message;
    element.className = 'mb-4 p-4 rounded text-sm border relative block'; // Reset class
    
    if (type === 'error') {
        element.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
        element.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    }
}