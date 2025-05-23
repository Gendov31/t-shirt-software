  // DOM Elements
  const progress = document.getElementById('progress');
  const steps = document.querySelectorAll('.step');
  const stepLabels = document.querySelectorAll('.step-label');
  const formSteps = document.querySelectorAll('.form-step');
  
  // Step 1: Upload Photo
  const uploadArea = document.getElementById('upload-area');
  const fileUpload = document.getElementById('file-upload');
  const previewContainer = document.getElementById('preview-container');
  const imagePreview = document.getElementById('image-preview');
  const removeButton = document.getElementById('remove-btn');
  const step1Next = document.getElementById('step1-next');
  
  // Step 2: T-shirt Details
  const sceneDescription = document.getElementById('scene-description');
  const styleOptions = document.getElementById('style-options');
  const inspirationGallery = document.getElementById('inspiration-gallery');
  const step2Back = document.getElementById('step2-back');
  const step2Next = document.getElementById('step2-next');
  const colorSelection = document.getElementById('color-selection');
  const colorError = document.getElementById('colorError');
  
  
  // Step 3: Preview
  const generatePreviewBtn = document.getElementById('generate-preview');

  const previewImageContainer = document.getElementById('preview-image-container');
  const tshirtPreview = document.getElementById('tshirt-preview');
  const step3Back = document.getElementById('step3-back');
  const step3Next = document.getElementById('step3-next');
  
  // Step 4: Contact & Shipping
  const step4Back = document.getElementById('step4-back');
  const submitOrder = document.getElementById('submit-order');
  const orderModal = document.getElementById('order-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalBtn = document.querySelector('.modal-btn');
  
  // Current step tracker
  let currentStep = 1;
  
  // Form data object to store user selections
  window.formData = {
    photo: {
      file:'',
      name:'',
      file_b64:''
    },
    sceneDescription: '',
    color:'',
    gender:'',
    style: '',
    size: '',         
    price: 0, 
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: ''
    }
  };
  
  // Initialize the form
  function initializeForm() {
    // Set up photo upload functionality
    setupPhotoUpload();
        
    // Set up navigation buttons
    setupNavigation();
    
    // Set up preview generation
    setupPreviewGeneration();
    
    // Set up order submission
    setupOrderSubmission();
  }
  //color save 
  colorSelection.addEventListener('change', () => {
    formData.color = colorSelection.value;
    if (colorSelection.value) {
      colorError.style.display = 'none';
    }
  });
  // Функция за скриване на грешката при описанието
sceneDescription.addEventListener('input', () => {
  formData.sceneDescription = sceneDescription.value;
  
  // Скрий грешката ако има достатъчно символи
  const descriptionError = document.getElementById('descriptionError');
  if (sceneDescription.value.trim().length >= 8) {
    descriptionError.style.display = 'none';
    sceneDescription.classList.remove('input-error');
  }
});

// Функция за скриване на грешката при избор на тип тениска
const genderSelection = document.getElementById('shirt-gender');
const genderError = document.getElementById('genderError');

genderSelection.addEventListener('change', () => {
  formData.gender = genderSelection.value;
  if (genderSelection.value) {
    genderError.style.display = 'none';
  }
});
  
  // Update progress bar and active steps
  function updateProgress(step) {
    const progressWidth = ((step - 1) / (steps.length - 1)) * 100;
    progress.style.width = `${progressWidth}%`;
    
    steps.forEach((stepItem, idx) => {
      if (idx < step) {
        stepItem.classList.add('completed');
      } else {
        stepItem.classList.remove('completed');
      }
      
      if (idx === step - 1) {
        stepItem.classList.add('active');
      } else {
        stepItem.classList.remove('active');
      }
    });
    
    stepLabels.forEach((label, idx) => {
      if (idx === step - 1) {
        label.classList.add('active');
      } else {
        label.classList.remove('active');
      }
    });
  }
  
  // Navigate between steps
  function navigateToStep(step) {
    formSteps.forEach((formStep, idx) => {
      if (idx === step - 1) {
        formStep.style.display = 'block';
      } else {
        formStep.style.display = 'none';
      }
    });
    
    currentStep = step;
    updateProgress(currentStep);
    
    // Scroll to top of form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Set up photo upload functionality
  function setupPhotoUpload() {
    // Click on upload area to trigger file input
    uploadArea.addEventListener('click', () => {
      fileUpload.click();
    });
    
    // Handle file selection
    fileUpload.addEventListener('change', handleFileSelect);
    
    // Remove button functionality
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      resetPhotoUpload();
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('upload-active');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('upload-active');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('upload-active');
      
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  }
  
  // Handle file selection
  function handleFileSelect(e) {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }
  
  // Process the selected file
  function handleFile(file) {
    // Check if file is JPEG or PNG
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('Please select a JPEG or PNG image.');
      return;
    }
  
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Please select an image less than 10MB in size.');
      return;
    }
  
    // Create object URL for preview
    const imageURL = URL.createObjectURL(file);
  
    // Update preview
    imagePreview.src = imageURL;
    previewContainer.style.display = 'block';
    document.querySelector('.upload-prompt').style.display = 'none';
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const base64DataUrl = e.target.result;
  
      // ✅ Save all parts into formData
      formData.photo = {
        file,
        name: file.name,
        file_b64: base64DataUrl
      };
  
      // Enable next button
      step1Next.disabled = false;
    };
  
    reader.readAsDataURL(file);
  }
  
  // Reset photo upload
  function resetPhotoUpload() {
    fileUpload.value = '';
    previewContainer.style.display = 'none';
    document.querySelector('.upload-prompt').style.display = 'block';
    formData.photo = null;
    step1Next.disabled = true;
    
    // Revoke object URL to prevent memory leaks
    if (imagePreview.src && imagePreview.src.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview.src);
    }
  }
  
  // Populate caricature styles
  function populateStyles() {
    styleOptions.innerHTML = '';
    
    data.caricatureStyles.forEach(style => {
      const styleElement = document.createElement('div');
      styleElement.classList.add('style-option');
      styleElement.dataset.id = style.id;
      
      const imageUrl = placeholderImages.styles[style.image];
      
      styleElement.innerHTML = `
        <img src="${imageUrl}" alt="${style.name}">
        <p>${style.name}</p>
      `;
      
      styleElement.addEventListener('click', () => {
        // Remove selected class from all options
        document.querySelectorAll('.style-option').forEach(el => {
          el.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        styleElement.classList.add('selected');
        
        // Store selection in form data
        formData.style = style.id;
      });
      
      styleOptions.appendChild(styleElement);
    });
  }
  
  // Populate inspiration gallery
  function populateInspirationGallery() {
    inspirationGallery.innerHTML = '';
    
    data.inspirationIdeas.forEach(item => {
      const inspirationElement = document.createElement('div');
      inspirationElement.classList.add('inspiration-item');
      
      const imageUrl = placeholderImages.inspirations[item.image];
      
      inspirationElement.innerHTML = `
        <img src="${imageUrl}" alt="${item.caption}" class="inspiration-img">
        <div class="inspiration-caption">${item.caption}</div>
      `;
      
      inspirationElement.addEventListener('click', () => {
        sceneDescription.value = item.description;
        formData.sceneDescription = item.description;
      });
      
      inspirationGallery.appendChild(inspirationElement);
    });
  }
  

  
  // Set up navigation buttons
  function setupNavigation() {
    // Step 1 Next
    step1Next.addEventListener('click', () => {
      navigateToStep(2);
    });
    
    // Step 2 Back
    step2Back.addEventListener('click', () => {
      navigateToStep(1);
    });
    
    // Step 2 Next
    step2Next.addEventListener('click', () => {
      const description = sceneDescription.value.trim();
      const descriptionError = document.getElementById('descriptionError');
      const genderSelection = document.getElementById('shirt-gender'); // 👈 вземаме полето за тип тениска
      const genderError = document.getElementById('genderError'); // 👈 вземаме полето за грешка
    
      let hasError = false;
    
      // Description validation
      if (description.length < 8) {
        descriptionError.style.display = 'block';
        sceneDescription.classList.add('input-error');
        sceneDescription.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hasError = true;
      } else {
        descriptionError.style.display = 'none';
        sceneDescription.classList.remove('input-error');
      }
    
      // Color validation
      if (!colorSelection.value) {
        colorError.style.display = 'block';
        colorSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hasError = true;
      } else {
        colorError.style.display = 'none';
      }
    
      // Gender validation 👇
      if (!genderSelection.value) {
        genderError.style.display = 'block';
        genderSelection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hasError = true;
      } else {
        genderError.style.display = 'none';
      }
    
      if (hasError) return;
    
      // Save to formData
      formData.sceneDescription = description;
      formData.color = colorSelection.value;
      formData.gender = genderSelection.value; // 👈 запазваме и пола на тениската
    
      navigateToStep(3);
    });
    
    
    
    // Step 3 Back
    step3Back.addEventListener('click', () => {
      if (window.resetPreview) {
        window.resetPreview();
      }
      navigateToStep(2);
    });
    
    // Step 3 Next
    step3Next.addEventListener('click', () => {
      navigateToStep(4);
    });
    
    // Step 4 Back
    step4Back.addEventListener('click', () => {
      navigateToStep(3);
    });
  }
  
 
// Set up preview generation
function setupPreviewGeneration() {
  const generatePreview = document.getElementById('generatePreview');
  const previewPlaceholder = document.getElementById('previewPlaceholder');
  const previewResult = document.getElementById('previewResult');
  const previewErrorContainer = document.getElementById('previewErrorContainer');
  const previewError = document.getElementById('previewError');
  const retryPreview = document.getElementById('retryPreview');
  const step3Next = document.getElementById('step3-next');
  
  let isGenerating = false;
  let progressInterval;
  let startTime;

  generatePreview.addEventListener('click', async () => {
    
    if (isGenerating) return;
    isGenerating = true;
    generatePreview.disabled = true;
  
    // Hide button visually
    generatePreview.style.display = 'none';
    previewPlaceholder.style.display = 'none';
    
    if (!formData.photo) {
      alert("Моля, качи снимка преди да генерираш визуализация.");
      isGenerating = false;
      generatePreview.disabled = false;
      generatePreview.style.display = 'inline-block';
      return;
    }
    
    // Create loading container if it doesn't exist
    let previewLoading = document.getElementById('previewLoading');
    if (!previewLoading) {
      previewLoading = document.createElement('div');
      previewLoading.id = 'previewLoading';
      previewLoading.className = 'preview-loading';
      previewLoading.style.display = 'flex';
      previewLoading.style.justifyContent = 'center';
      previewLoading.style.alignItems = 'center';
      previewLoading.style.flexDirection = 'column';
      previewLoading.style.width = '100%';
      previewLoading.style.height = '300px';
      
      // Insert loading container after previewPlaceholder
      previewPlaceholder.parentNode.insertBefore(previewLoading, previewPlaceholder.nextSibling);
    } else {
      previewLoading.style.display = 'flex';
      previewLoading.innerHTML = ''; // Clear any previous content
    }
    
    // Create and show loading animation with blur effect on the uploaded image
    const loadingAnimation = document.createElement('div');
    loadingAnimation.style.position = 'relative';
    loadingAnimation.style.width = '100%';
    loadingAnimation.style.height = '100%';
    loadingAnimation.style.display = 'flex';
    loadingAnimation.style.flexDirection = 'column';
    loadingAnimation.style.alignItems = 'center';
    loadingAnimation.style.justifyContent = 'center';

    // Add the blurred image preview
    const loadingImage = document.createElement('img');
    loadingImage.src = URL.createObjectURL(formData.photo.file);
    loadingImage.style.width = '80%';
    loadingImage.style.height = '80%';
    loadingImage.style.objectFit = 'contain';
    loadingImage.style.filter = 'blur(20px)';
    loadingImage.style.transition = 'filter 60s linear';
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.style.width = '80%';
    progressContainer.style.marginTop = '20px';
    progressContainer.style.textAlign = 'center';
    
    // Add progress bar background
    const progressBarBg = document.createElement('div');
    progressBarBg.style.width = '100%';
    progressBarBg.style.height = '8px';
    progressBarBg.style.backgroundColor = '#e0e0e0';
    progressBarBg.style.borderRadius = '4px';
    progressBarBg.style.overflow = 'hidden';
    progressBarBg.style.marginBottom = '15px';
    
    // Add progress bar fill
    const progressBarFill = document.createElement('div');
    progressBarFill.style.height = '100%';
    progressBarFill.style.backgroundColor = '#3498db';
    progressBarFill.style.width = '0%';
    progressBarFill.style.transition = 'width 0.3s ease';
    progressBarFill.style.borderRadius = '4px';
    
    progressBarBg.appendChild(progressBarFill);
    
    // Add loading text with percentage
    const loadingText = document.createElement('p');
    loadingText.textContent = 'Създаване на визуализация... 0%';
    loadingText.style.margin = '0 0 10px 0';
    loadingText.style.color = '#333';
    loadingText.style.fontWeight = 'bold';
    loadingText.style.fontSize = '16px';
    
    // Add time estimate text
    const timeText = document.createElement('p');
    timeText.textContent = 'Очаквано време: до 1 минута';
    timeText.style.margin = '0';
    timeText.style.color = '#666';
    timeText.style.fontSize = '14px';
    
    

    // Assemble the loading animation
    progressContainer.appendChild(loadingText);
    progressContainer.appendChild(progressBarBg);
    progressContainer.appendChild(timeText);
  
    
    loadingAnimation.appendChild(loadingImage);
    loadingAnimation.appendChild(progressContainer);
    previewLoading.appendChild(loadingAnimation);

    // Start the unblur animation
    setTimeout(() => {
      loadingImage.style.filter = 'blur(10px)';
    }, 100);

    // Start progress simulation
    startTime = Date.now();
    let progress = 0;
    
    progressInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000; // elapsed time in seconds
      const maxTime = 60; // 60 seconds max
      
      // Simulate realistic progress curve (faster at start, slower at end)
      const rawProgress = Math.min(elapsed / maxTime, 0.95); // Cap at 95% until actual completion
      progress = Math.floor(rawProgress * 100);
      
      // Update progress bar
      progressBarFill.style.width = `${progress}%`;
      
      // Update text based on progress
      if (progress < 30) {
        loadingText.textContent = `Анализиране на снимката... ${progress}%`;
      } else if (progress < 60) {
        loadingText.textContent = `Генериране на модел... ${progress}%`;
      } else if (progress < 90) {
        loadingText.textContent = `Прилагане на стил... ${progress}%`;
      } else {
        loadingText.textContent = `Финализиране... ${progress}%`;
      }
      
      // Update time estimate
      const remainingTime = Math.max(0, maxTime - elapsed);
      if (remainingTime > 30) {
        timeText.textContent = `Остават: около ${Math.ceil(remainingTime)} секунди`;
      } else if (remainingTime > 5) {
        timeText.textContent = `Остават: ${Math.ceil(remainingTime)} секунди`;
      } else if (remainingTime > 0) {
        timeText.textContent = 'Почти готово...';
      } else {
        timeText.textContent = 'Обработване на резултата...';
      }
      
    }, 500); // Update every 500ms for smooth animation
      
    const formDataToSend = new FormData();
    formDataToSend.append('PersonPhoto', formData.photo.file);
    formDataToSend.append('sceneDescription', formData.sceneDescription || '');
    formDataToSend.append('imgStyle', formData.style || '');
    formDataToSend.append('chosenColor', formData.color || '');
    formDataToSend.append('chosenGender', formData.gender || '');
    
    try {
      const response = await fetch('https://n8n.enchantiya.com/webhook/1e27fb75-6226-452c-9cf0-7fa3cae92bd4', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();

      // Clear progress interval
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      // Complete the progress animation
      progressBarFill.style.width = '100%';
      loadingText.textContent = 'Готово! 100%';
      timeText.textContent = 'Визуализацията е създадена успешно!';

      // Check if the response has the expected format
      if (!result.image) {
        throw new Error('Response does not contain image data');
      }

      // Store both the preview image and the print image
      const previewImageUrl = `data:image/png;base64,${result.image}`;
      
      // Create files from both images
      try {
        // For the preview image (what client sees)
        const previewResponse = await fetch(previewImageUrl);
        const previewBlob = await previewResponse.blob();
        const previewFile = new File([previewBlob], "preview-" + Math.random().toString(36).substring(7) + ".png", { type: 'image/png' });
        
        // Store the preview data
        formData.previewPhoto = {
          file_b64: previewImageUrl,
          name: previewFile.name,
          file: previewFile
        };
        
        // For the print image (what goes to print)
        if (result.print) {
          const printImageUrl = `data:image/png;base64,${result.print}`;
          const printResponse = await fetch(printImageUrl);
          const printBlob = await printResponse.blob();
          const printFile = new File([printBlob], "print-" + Math.random().toString(36).substring(7) + ".png", { type: 'image/png' });
          
          // Store the print data
          formData.printPhoto = {
            file_b64: printImageUrl,
            name: printFile.name,
            file: printFile
          };
        } else {
          console.warn("⚠️ No print image received, only preview image available");
        }
      } catch (blobError) {
        console.error("Error creating files from base64:", blobError);
        // Store just the base64 strings as fallback
        formData.previewBase64 = result.image;
        if (result.print) {
          formData.printBase64 = result.print;
        }
      }

      // Wait a moment to show completion before hiding
      setTimeout(() => {
        // Hide loading and display the preview image
        previewLoading.style.display = 'none';
        previewResult.style.display = 'flex';
    
        const img = document.getElementById("caricaturePreview");
        img.src = previewImageUrl;
        img.alt = 'Generated Preview';
        
        // Enable the next button since we have a preview
        if (step3Next) {
          step3Next.disabled = false;
        }
      }, 1000); // Show completion for 1 second
      
    } catch (error) {
      console.error('Error generating preview:', error);
      
      // Clear progress interval
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      
      previewLoading.style.display = 'none';
      previewErrorContainer.style.display = 'flex';
      previewError.textContent = 'Не успяхме да генерираме модел. Моля, опитайте отново.';
    } finally {
      isGenerating = false;
      generatePreview.disabled = false;
      
      // Clear progress interval if still running
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    }
  });
  
  retryPreview.addEventListener('click', () => {
    // Clear any existing progress interval
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    
    previewErrorContainer.style.display = 'none';
    previewPlaceholder.style.display = 'flex';
    generatePreview.style.display = 'inline-block';
    
    // Hide loading container if visible
    const previewLoading = document.getElementById('previewLoading');
    if (previewLoading) {
      previewLoading.style.display = 'none';
    }
  });
  
  step3Next.addEventListener('click', () => {
    navigateToStep(4);
  });
  
  // Function to reset preview
  function resetPreview() {
    // Clear any existing progress interval
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    
    // Hide preview result
    previewResult.style.display = 'none';
    generatePreview.style.display = 'inline-block';
    
    // Clear preview image
    const img = document.getElementById("caricaturePreview");
    if (img) {
      img.src = '';
      img.alt = '';
    }
    
    // Reset form data for preview
    formData.previewPhoto = {
      file_b64: "",
      file: null,
      name: ""
    };
    formData.previewBase64 = '';
    
    // Reset print data if exists
    if (formData.printPhoto) {
      formData.printPhoto = {
        file_b64: "",
        file: null,
        name: ""
      };
    }
    formData.printBase64 = '';
    
    // Hide error message if visible
    previewErrorContainer.style.display = 'none';
    
    // Hide loading animation if visible
    const previewLoading = document.getElementById('previewLoading');
    if (previewLoading) {
      previewLoading.style.display = 'none';
      previewLoading.innerHTML = '';
    }
  }
  
  // Make resetPreview accessible for navigation
  window.resetPreview = resetPreview;
}

  
  
  
// Set up order submission
function setupOrderSubmission() {
  submitOrder.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Immediately disable the submit button to prevent multiple clicks
    submitOrder.disabled = true;
    submitOrder.classList.add('disabled-button');
    submitOrder.textContent = 'Изпращане...';
    
    // Make sure size and price are set
    if (!formData.size || !formData.price) {
      console.error("Size or price not set:", formData.size, formData.price);
      document.getElementById('sizeError').style.display = 'block';
      submitOrder.disabled = false;
      submitOrder.classList.remove('disabled-button');
      submitOrder.textContent = 'Поръчай';
      return;
    }

    // Make sure we have a preview image
    if (!formData.previewPhoto && !formData.previewBase64) {
      alert("Моля, генерирайте визуализация преди да изпратите поръчката.");
      submitOrder.disabled = false;
      submitOrder.classList.remove('disabled-button');
      submitOrder.textContent = 'Поръчай';
      return;
    }

    formData.contactInfo = {
      name: document.getElementById('full-name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      postalCode: document.getElementById('postal-code').value,
      paymentMethod: document.getElementById('selectedPaymentMethod').value
    };

    const selectedMethod = formData.contactInfo.paymentMethod;
    if (!selectedMethod) {
      document.getElementById('paymentError').style.display = 'block';
      submitOrder.disabled = false;
      submitOrder.classList.remove('disabled-button');
      submitOrder.textContent = 'Поръчай';
      return;
    }

    if (!validateForm()) {
      submitOrder.disabled = false;
      submitOrder.classList.remove('disabled-button');
      submitOrder.textContent = 'Поръчай';
      return;
    }

    // Normalize phone
    const phone = formData.contactInfo.phone.replace(/[\s-()]/g, '');
    let normalizedPhone = phone;

    if (phone.startsWith('00359')) {
      normalizedPhone = phone.replace(/^00359/, '+359');
    } else if (phone.startsWith('0') && phone.length === 10) {
      normalizedPhone = phone.replace(/^0/, '+359');
    } else if (/^8\d{8}$/.test(phone)) {
      normalizedPhone = '+359' + phone;
    } else if (!/^\+359\d{9}$/.test(phone)) {
      alert("Моля, въведи валиден телефонен номер.");
      submitOrder.disabled = false;
      submitOrder.classList.remove('disabled-button');
      submitOrder.textContent = 'Поръчай';
      return;
    }

    // Calculate final price including COD if needed
    let finalPrice = parseFloat(formData.price);
    if (selectedMethod === 'cod') {
      finalPrice += 19.90;
    }
    
    console.log("Final price to be sent:", finalPrice);
    console.log("Payment method:", selectedMethod);

    // Show loading state in modal
    orderModal.style.display = 'flex';
    orderModal.innerHTML = `
      <div class="order-processing">
        <p>Обработка на поръчката...</p>
      </div>
    `;
    

    
    try {
      const fd = new FormData();
      
      // Add all the basic order data
      fd.append('PersonPhoto', formData.photo.file);
      fd.append('FileName_PersonPhoto', formData.photo.name);
      fd.append('sceneDescription', formData.sceneDescription);
      fd.append('imgStyle', formData.style);
      fd.append('chosenColor', formData.color);
      fd.append('chosenGender', formData.gender);
      fd.append('fullName', formData.contactInfo.name);
      fd.append('email', formData.contactInfo.email);
      fd.append('phone', normalizedPhone);
      fd.append('address', formData.contactInfo.address);
      fd.append('city', formData.contactInfo.city);
      fd.append('postcode', formData.contactInfo.postalCode);
      fd.append('paymentType', formData.contactInfo.paymentMethod);
      fd.append('size', String(formData.size));
      fd.append('price', String(finalPrice.toFixed(2)));
      
      // Add BOTH preview and print images if available
      
      // Preview image (what the client sees)
      if (formData.previewPhoto && formData.previewPhoto.file) {
        fd.append('PreviewImage', formData.previewPhoto.file);
        fd.append('FileName_PreviewImage', formData.previewPhoto.name || 'preview.png');
      } else if (formData.previewBase64) {
        fd.append('PreviewImage_Base64', formData.previewBase64);
      }
      
      // Print image (what goes to print)
      if (formData.printPhoto && formData.printPhoto.file) {
        fd.append('PrintImage', formData.printPhoto.file);
        fd.append('FileName_PrintImage', formData.printPhoto.name || 'print.png');
      } else if (formData.printBase64) {
        fd.append('PrintImage_Base64', formData.printBase64);
      }

      // Submit the order
      const response = await fetch("https://n8n.enchantiya.com/webhook/9c6153a3-8ff0-4395-9127-a04616a4b319", {
        method: "POST",
        body: fd
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();
      console.log("✅ Order sent to webhook. Full response:", result);
      
      // Handle different payment methods
      if (formData.contactInfo.paymentMethod === 'card') {
        // For card payment, redirect to Stripe checkout if URL exists
        if (result.checkoutUrl) {
          console.log("Redirecting to checkout URL:", result.checkoutUrl);
          window.location.href = result.checkoutUrl;
        } else {
          // If no checkout URL, show an error
          orderModal.innerHTML = `
            <div class="order-error">
              <p>Възникна грешка с платежната система. Моля, опитайте отново или изберете друг метод на плащане.</p>
              <button id="closeErrorModal" class="close-modal-btn">Затвори</button>
            </div>
          `;
          
          document.getElementById('closeErrorModal').addEventListener('click', () => {
            orderModal.style.display = 'none';
            submitOrder.disabled = false;
            submitOrder.classList.remove('disabled-button');
            submitOrder.textContent = 'Поръчай';
          });
        }
      } else if (formData.contactInfo.paymentMethod === 'cod') {
        // For COD, redirect to thank-you page
        console.log("COD selected, redirecting to thank-you page");
        window.location.href = "thank-you.html";
      } else {
        // Unknown payment method - show generic success
        orderModal.innerHTML = `
          <div class="order-success">
            <h3>Поръчката е успешно изпратена!</h3>
            <p>Благодарим за вашата поръчка!</p>
            <button id="closeSuccessModal" class="close-modal-btn">Затвори</button>
          </div>
        `;
        
        document.getElementById('closeSuccessModal').addEventListener('click', () => {
          orderModal.style.display = 'none';
        });
      }
      
    } catch (err) {
      console.error("❌ Order failed:", err);
      orderModal.innerHTML = `
        <div class="order-error">
          <p>Възникна грешка. Моля, опитай отново.</p>
          <button id="closeErrorModal" class="close-modal-btn">Затвори</button>
        </div>
      `;
      
      document.getElementById('closeErrorModal').addEventListener('click', () => {
        orderModal.style.display = 'none';
      });
      
      // Re-enable the button on error
      setTimeout(() => {
        submitOrder.disabled = false;
        submitOrder.classList.remove('disabled-button');
        submitOrder.textContent = 'Поръчай';
      }, 3000);
    }
  });
}
  // Form validation
  function validateForm() {
    let isValid = true;
  
    const fields = [
      { id: 'full-name', errorId: 'error-full-name' },
      { id: 'email', errorId: 'error-email' },
      { id: 'phone', errorId: 'error-phone' },
      { id: 'address', errorId: 'error-address' },
      { id: 'city', errorId: 'error-city' },
      { id: 'postal-code', errorId: 'error-postal-code' }
    ];
  
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);
  
      if (!input.value.trim()) {
        error.style.display = 'block';
        input.classList.add('input-error');
        isValid = false;
      } else {
        error.style.display = 'none';
        input.classList.remove('input-error');
      }
    });
  
    // ✅ Email format validation
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('error-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
      emailError.style.display = 'block';
      emailInput.classList.add('input-error');
      isValid = false;
    }
  
    // ✅ Phone number format validation (BG mobile or international)
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('error-phone');
    const phoneRegex = /^(?:\+359|0)(?:87|88|89)\d{7}$/;
  
    if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
      phoneError.style.display = 'block';
      phoneInput.classList.add('input-error');
      isValid = false;
    }
  
    // ✅ Проверка за избран размер
    if (!window.formData?.size) {
      const sizeError = document.getElementById('sizeError');
      if (sizeError) {
        sizeError.style.display = 'block';
      }
      const container = document.querySelector('.size-options');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      isValid = false;
    }
  
    // ✅ Проверка за начин на плащане
    const selectedPayment = document.getElementById('selectedPaymentMethod')?.value;
    const paymentError = document.getElementById('paymentError');
  
    if (!selectedPayment) {
      if (paymentError) paymentError.style.display = 'block';
      isValid = false;
    }
  
    return isValid;
  }
  
  
  

  
  // Initialize form on page load
  document.addEventListener('DOMContentLoaded', () => {
    initializeForm();            // за формата
  });

 
  let isCodChosen = false;

function selectPaymentMethod(method) {
  const hiddenInput = document.getElementById('selectedPaymentMethod');
  if (hiddenInput) {
    hiddenInput.value = method;
  }

  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));

  const prevMethod = window.formData?.paymentType || '';

  if (method === 'card') {
    document.getElementById('paymentCard').classList.add('selected');
    window.formData.paymentType = 'card';

    if (prevMethod === 'cod') {
      isCodChosen = false;
    }

  } else if (method === 'cod') {
    document.getElementById('paymentCOD').classList.add('selected');
    window.formData.paymentType = 'cod';

    // Ако предишният метод не е бил cod — разрешаваме начисляване
    if (prevMethod !== 'cod') {
      isCodChosen = false;
    }
  }

  const paymentError = document.getElementById('paymentError');
  if (paymentError) {
    paymentError.style.display = 'none';
  }

  if (typeof updateTotalPrice === 'function') {
    updateTotalPrice();
  }
}

function updateTotalPrice() {
  const totalBox = document.getElementById('totalPriceBox');
  const totalAmount = document.getElementById('totalAmount');

  const basePrice = parseFloat(window.formData.price || 0);
  const paymentMethod = document.getElementById('selectedPaymentMethod')?.value;

  if (!basePrice || isNaN(basePrice)) {
    totalBox.style.display = 'none';
    return;
  }

  let finalPrice = basePrice;

  // Add COD fee if applicable
  if (paymentMethod === 'cod') {
    finalPrice += 19.90;
  }

  // Store the calculated price for submission
  window.formData.finalPrice = finalPrice;
  
  totalAmount.textContent = `${finalPrice.toFixed(2)} лв.`;
  totalBox.style.display = 'block';
  

}