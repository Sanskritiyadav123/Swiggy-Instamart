let currentStep = 'home';
let selectedService = null;
let bookingDetails = {
    time: '',
    address: 'Home - Main Street, Jabalpur - 482001'
};
let cart = [];
let isLoading = false;

const services = [
    { name: 'Electrician', icon: '⚡', description: 'Switch & appliance repair, new fittings.' },
    { name: 'AC Repair', icon: '❄️', description: 'Servicing, gas refill, and leak fixes.' },
    { name: 'Pet Grooming', icon: '🐾', description: 'Quick wash and styling for your pet.' },
    { name: 'Home Cleaning', icon: '🧹', description: 'Deep cleaning for kitchen, bathroom, etc.' },
    { name: 'Car Wash', icon: '🚗', description: 'At-home car wash and interior cleaning.' },
    { name: 'Laundry Pickup', icon: '🧺', description: 'Wash, fold, and iron services.' },
];

const serviceDetails = {
    'AC Repair': {
        subservices: [
            { name: 'Fan Not Working/Repair', price: 150 },
            { name: 'Switch Board Issues/Repair', price: 200 },
            { name: 'Power Outage - Emergency Call', price: 300 },
            { name: 'AC Repair & Servicing', price: 450 }
        ]
    },
    'Electrician': {
        subservices: [
            { name: 'Switch Repair', price: 200 },
            { name: 'Fan Repair', price: 150 },
            { name: 'Outlet Installation', price: 250 },
        ]
    },
    'Pet Grooming': {
        subservices: [
            { name: 'Quick Grooming', price: 500 },
            { name: 'Full Grooming', price: 800 },
        ]
    },
    'Home Cleaning': {
        subservices: [
            { name: 'Kitchen Cleaning', price: 750 },
            { name: 'Bathroom Cleaning', price: 600 },
        ]
    },
    'Car Wash': {
        subservices: [
            { name: 'Exterior Wash', price: 400 },
            { name: 'Interior Cleaning', price: 350 },
        ]
    },
    'Laundry Pickup': {
        subservices: [
            { name: 'Wash and Fold', price: 150 },
            { name: 'Wash and Iron', price: 200 },
        ]
    }
};

const appContainer = document.getElementById('app-container');

// Functions to render each screen
function renderHomeScreen() {
    appContainer.innerHTML = `
        <div class="space-y-6">
            <div class="bg-orange-500 text-white p-6 rounded-2xl shadow-lg">
                <h1 class="text-2xl font-bold mb-2">Swiggy Quick Services</h1>
                <p class="text-sm opacity-90">
                    Need urgent service? Think less, book fast.
                    Book and receive any urgent service at home—just like Swiggy groceries—within 60 minutes.
                </p>
            </div>
            <div class="p-4 bg-gray-100 rounded-2xl space-y-4">
                <h2 class="text-lg font-semibold">Services & Repairs</h2>
                <div class="grid grid-cols-3 gap-4">
                    <button id="all-services-btn" class="bg-white p-4 rounded-xl shadow-sm text-center transform transition-transform duration-200 hover:scale-105">
                        <div class="p-2 bg-yellow-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">🛠️</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">All Services</span>
                    </button>
                    <!-- Mock service buttons -->
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div class="p-2 bg-blue-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">❄️</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">AC Repair</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div class="p-2 bg-green-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">🧹</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">Cleaning</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div class="p-2 bg-red-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">🚗</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">Car Wash</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div class="p-2 bg-purple-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">🐾</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">Pet Grooming</span>
                    </div>
                    <div class="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div class="p-2 bg-orange-100 rounded-full mx-auto w-12 h-12 flex items-center justify-center">
                            <span class="text-2xl">⚡</span>
                        </div>
                        <span class="block mt-2 text-sm font-medium">Electrician</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('all-services-btn').addEventListener('click', () => {
        currentStep = 'services';
        renderApp();
    });
}

function renderServicesGrid() {
    const servicesHtml = services.map((service, index) => `
        <button
            class="bg-white p-4 rounded-xl shadow-sm text-left border border-gray-100 transition-all duration-200 hover:border-orange-500 hover:shadow-lg"
            data-service-name="${service.name}"
        >
            <div class="text-3xl mb-2">${service.icon}</div>
            <h3 class="font-semibold text-lg">${service.name}</h3>
            <p class="text-sm text-gray-500 line-clamp-2">${service.description}</p>
        </button>
    `).join('');

    appContainer.innerHTML = `
        <div class="space-y-6">
            <button id="back-btn" class="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                Back
            </button>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">Services & Repairs</h2>
                <button class="text-orange-500 font-semibold text-sm">See All</button>
            </div>
            <div class="grid grid-cols-2 gap-4" id="services-grid">
                ${servicesHtml}
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        currentStep = 'home';
        renderApp();
    });
    document.getElementById('services-grid').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const serviceName = button.dataset.serviceName;
            selectedService = services.find(s => s.name === serviceName);
            cart = []; // Reset cart for new service
            currentStep = 'details';
            renderApp();
        }
    });
}

function renderServiceDetails() {
    if (!selectedService || !serviceDetails[selectedService.name]) {
        appContainer.innerHTML = `<div class="p-6 text-center text-gray-500">Service details not found.</div>`;
        return;
    }
    const details = serviceDetails[selectedService.name];
    const subservicesHtml = details.subservices.map((sub, index) => {
        const isInCart = cart.some(item => item.name === sub.name);
        return `
            <div class="flex items-center justify-between p-4 bg-gray-100 rounded-xl" data-subservice-name="${sub.name}" data-subservice-price="${sub.price}">
                <div>
                    <h4 class="font-semibold text-base">${sub.name}</h4>
                    <p class="text-xs text-gray-500">Service details here...</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-lg font-bold">₹${sub.price}</span>
                    <button class="add-btn ${isInCart ? 'bg-orange-600' : 'bg-orange-500'}">
                        ${isInCart ? 'ADDED' : 'ADD'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    appContainer.innerHTML = `
        <div class="space-y-6">
            <button id="back-btn" class="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                Back
            </button>
            <h1 class="text-2xl font-bold">${selectedService.name}</h1>
            <p class="text-gray-500 text-sm">${selectedService.description}</p>
            <div class="space-y-4" id="subservices-list">
                ${subservicesHtml}
            </div>
            <div class="space-y-4">
                <h3 class="font-semibold text-lg">Service Details & Requirements</h3>
                <div class="flex items-center justify-between border-b pb-2">
                    <span class="text-sm">Is this an emergency?</span>
                    <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox" />
                        <label for="toggle" class="toggle-label"></label>
                    </div>
                </div>
                <div class="p-4 bg-gray-100 rounded-xl">
                    <p class="text-sm font-medium">Add requirements or notes</p>
                    <textarea
                        class="w-full mt-2 p-2 text-sm bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                        rows="3"
                        placeholder="e.g., Fan not working, please bring a new capacitor."
                    ></textarea>
                </div>
                <div class="flex justify-between items-center py-4 px-6 bg-orange-100 rounded-xl font-bold">
                    <span>Total:</span>
                    <span id="total-price">₹${totalPrice}</span>
                </div>
                <button id="proceed-to-booking" class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition-colors">
                    Proceed to Booking
                </button>
            </div>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
        currentStep = 'services';
        renderApp();
    });
    document.getElementById('subservices-list').addEventListener('click', (e) => {
        const button = e.target.closest('.add-btn');
        if (button) {
            const container = button.closest('[data-subservice-name]');
            const name = container.dataset.subserviceName;
            const price = parseInt(container.dataset.subservicePrice);

            const existingItemIndex = cart.findIndex(item => item.name === name);
            if (existingItemIndex > -1) {
                cart.splice(existingItemIndex, 1);
            } else {
                cart.push({ name, price });
            }
            renderApp(); // Re-render to update the cart and total
        }
    });
    document.getElementById('proceed-to-booking').addEventListener('click', () => {
        currentStep = 'time-address';
        renderApp();
    });
}

function renderTimeAddressSelection() {
    const timeSlots = ['Today, 2:00 PM', 'Today, 4:30 PM', 'Tomorrow, 10:00 AM', 'Tomorrow, 1:00 PM'];
    const timeSlotsHtml = timeSlots.map((slot, index) => `
        <div
            class="p-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 time-slot-btn"
            data-time-slot="${slot}"
        >
            <span class="text-sm">${slot}</span>
        </div>
    `).join('');

    appContainer.innerHTML = `
        <div class="space-y-6">
            <button id="back-btn" class="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                Back
            </button>
            <h1 class="text-2xl font-bold">Select Time & Address</h1>
            <div class="space-y-2">
                <h3 class="font-semibold text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-orange-500 lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    When do you need service?
                </h3>
                <button id="time-slot-dropdown" class="w-full flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                    <span class="text-sm">${bookingDetails.time || 'Select a time slot'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 lucide lucide-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                </button>
                <div id="time-slots-container" class="hidden bg-white rounded-xl shadow-lg mt-2">
                    ${timeSlotsHtml}
                </div>
            </div>
            <div class="space-y-2">
                <h3 class="font-semibold text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-orange-500 lucide lucide-map-pin"><path d="M12 18s-6-5-6-9a6 6 0 0 1 12 0c0 4-6 9-6 9z"/><circle cx="12" cy="12" r="3"/></svg>
                    Select Address
                </h3>
                <div class="p-4 bg-orange-100 rounded-xl border border-orange-500">
                    <h4 class="font-semibold text-sm">Home</h4>
                    <p class="text-xs text-gray-600">${bookingDetails.address}</p>
                </div>
                <button class="w-full py-2 text-orange-500 text-sm font-bold rounded-xl border-2 border-orange-500">
                    + Add New Address
                </button>
            </div>
            <button id="book-now-btn" class="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                ${isLoading ? `
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding best electrician...</span>
                ` : `
                    <span>Book Now</span>
                `}
            </button>
        </div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => {
        currentStep = 'details';
        renderApp();
    });
    document.getElementById('time-slot-dropdown').addEventListener('click', () => {
        const container = document.getElementById('time-slots-container');
        container.classList.toggle('hidden');
    });

    document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            bookingDetails.time = e.target.closest('.time-slot-btn').dataset.timeSlot;
            renderApp();
        });
    });

    const bookBtn = document.getElementById('book-now-btn');
    if (isLoading || !bookingDetails.time) {
        bookBtn.disabled = true;
    } else {
        bookBtn.disabled = false;
    }
    bookBtn.addEventListener('click', () => {
        isLoading = true;
        renderApp();
        setTimeout(() => {
            isLoading = false;
            currentStep = 'confirmation';
            renderApp();
        }, 2000);
    });
}

function renderConfirmationScreen() {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    appContainer.innerHTML = `
        <div class="space-y-6 text-center">
            <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500 mx-auto mb-4 lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                <h1 class="text-2xl font-bold">Booking Confirmed!</h1>
                <p class="text-gray-600">Your request has been successfully placed.</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h3 class="text-lg font-semibold">${selectedService.name}</h3>
                    <span class="text-xl font-bold">₹${totalPrice}</span>
                </div>
                <div class="text-sm text-gray-600 space-y-1">
                    <p class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400 lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${bookingDetails.time}</p>
                    <p class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400 lucide lucide-map-pin"><path d="M12 18s-6-5-6-9a6 6 0 0 1 12 0c0 4-6 9-6 9z"/><circle cx="12" cy="12" r="3"/></svg>${bookingDetails.address}</p>
                </div>
            </div>
            <p class="text-sm text-gray-500 mt-4">
                An expert will be assigned shortly and you will receive a confirmation call.
            </p>
            <button id="return-home-btn" class="w-full bg-white text-orange-500 py-3 rounded-xl font-bold text-lg border-2 border-orange-500 hover:bg-orange-50 transition-colors">
                Return to Home
            </button>
        </div>
    `;
    document.getElementById('return-home-btn').addEventListener('click', () => {
        currentStep = 'home';
        renderApp();
    });
}

// Main rendering function
function renderApp() {
    switch (currentStep) {
        case 'home':
            renderHomeScreen();
            break;
        case 'services':
            renderServicesGrid();
            break;
        case 'details':
            renderServiceDetails();
            break;
        case 'time-address':
            renderTimeAddressSelection();
            break;
        case 'confirmation':
            renderConfirmationScreen();
            break;
        default:
            renderHomeScreen();
    }
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
