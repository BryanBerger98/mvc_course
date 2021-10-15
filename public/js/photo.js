document.addEventListener('DOMContentLoaded', () => {
    const profilePhotoForm = document.getElementById('profilePhotoForm') ? document.getElementById('profilePhotoForm') : null;
    if (profilePhotoForm) {
        profilePhotoForm.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const formData = new FormData();
            formData.append('file', document.getElementById('profilePhotoInput').files[0]);
    
            console.log(document.getElementById('profilePhotoInput').files[0]);
        
            const xhr = new XMLHttpRequest();
            if (xhr.upload && document.getElementById('profilePhotoInput').files && document.getElementById('profilePhotoInput').files.length > 0) {
    
                xhr.upload.onprogress = function(e) {
                    let done = e.position || e.loaded, total = e.totalSize || e.total;
                    console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
                };
    
                console.log('OK');
    
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        // window.location = '/users/admin';
                        console.log('FINI !!!!');
                    }
                }
    
                xhr.open('POST', '/users/upload-photo/' + event.target.id.value, true);
                xhr.send(formData);
            }
            
        });
    }
});