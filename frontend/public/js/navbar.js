// Fetch and include the content of another HTML file
fetch('/navbar.html')
    .then(response => response.text())
    .then(html => {
        // return details to Navbar Content
        document.getElementById('navbarContent').innerHTML = html;

        // Profile Script Start
        async function viewProfile() {
            const tokenProfile = localStorage.getItem('token'); // Get the stored token
            if (!tokenProfile) {
                console.log('Can\'t view profile at the moment!');
                alert('Can\'t view profile at the moment!');
                return;
            }
            try {
                const responseProfile = await fetch('http://143.198.237.154/api/verify', {
                    method: 'GET',
                    headers: {
                        'Authorization': tokenProfile
                    }
                });
                const resultProfile = await responseProfile.text();
                console.log(resultProfile);

                if (responseProfile.ok) {
                    const verificationData = await JSON.parse(resultProfile);
                    console.log('Profile:', verificationData);
                    localStorage.setItem('userId', verificationData.userId);
                    const profileBody = document.querySelector("#profileBody");
                    profileBody.innerHTML = `
            <html>
            <body>
            <h5 style="color:#777; font-size:1rem;">First name: ${verificationData.fname}</h5>
            <h5 style="color:#777; font-size:1rem;">Last name: ${verificationData.lname}</h5>
            <h5 style="color:#777; font-size:1rem;">Username: ${verificationData.UserOrEmail}</h5>
            <h5 style="color:#777; font-size:1rem;">Mobile: ${verificationData.mobile}</h5>
            </body>
            </html>
        `;
                } else {
                    console.log('User profile could not be viewed:', responseProfile.statusText);
                }
            } catch (error) {
                console.error('Error verifying user:', error);
            }
        }

        const profile = document.querySelector("#nav > ul > div > ul > li:nth-child(1) > a");
        profile.addEventListener('click', viewProfile);
        // Profile script end

        // Log out script
        const handleLogoutButton = async (event) => {
            event.preventDefault();

            const requestOptionsLO = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch("http://143.198.237.154/api/logout", requestOptionsLO);

            try {
                if (response.ok) {
                    localStorage.clear();
                    window.location.href = '/';
                } else {
                    alert("Something went wrong!");
                }
            } catch (error) {
                console.log(error);
            }
        };

        const logout = document.getElementById('logout');
        logout.addEventListener('click', handleLogoutButton);
        // Log out script end

        const tokenNav = localStorage.getItem('token'); // Get the stored token
        if (!tokenNav) {
            console.log('User is not logged in');
            const proper = document.getElementById("proper");
            const myProper = document.getElementById("myProper");
            const worksp = document.getElementById("worksp");
            const bookings = document.getElementById("bookings");
            const acct = document.getElementById("acct");
            proper.style.display = 'none';
            myProper.style.display = 'none';
            worksp.style.display = 'none';
            bookings.style.display = 'none';
            acct.style.display = 'none';
            return;
        }

        // fetch data for role Owner and User
        fetch('http://143.198.237.154/api/verify', {
            method: 'GET',
            headers: {
                'Authorization': `${tokenNav}`
            }
        })
            .then(responseN => responseN.text())
            .then(body => {
                console.log(body);
                const bodyParse = JSON.parse(body);
                const message = bodyParse.message;
                console.log(message);
                if (message === "jwt expired") {
                    localStorage.clear();
                } else {
                    const role = bodyParse.role;
                    const userID = bodyParse.userId;
                    localStorage.setItem('role', role);
                    localStorage.setItem('userID', userID);
                    const logen = document.getElementById("logen");
                    const signep = document.getElementById("signep");
                    logen.style.display = 'none';
                    signep.style.display = 'none';
                    console.log(role === 'owner');
                    if (role === 'owner') {
                        const bookings = document.getElementById("bookings");
                        bookings.style.display = 'none';
                    } else {
                        const proper = document.getElementById("proper");
                        proper.style.display = 'none';
                        const myproper = document.getElementById("myProper");
                        myproper.style.display = 'none';
                        const worksp = document.getElementById("worksp");
                        worksp.innerHTML = "Workspaces";
                        const currentPath = window.location.pathname;
                        if (currentPath == '/myProperties') {
                            window.history.back();
                            alert('You don\'t have permission to access this site.');
                        }
                    }
                }
            })
            .catch(error => console.error('error: ', error));

    })
    .catch(error => console.error('Error loading content:', error));

