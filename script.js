document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
      });
    });
  }

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Thanks — your message has been received. We\'ll get back to you soon.';
      form.reset();
    });
  }

  // Gallery lightbox with prev/next navigation
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    var overlayImg = document.createElement('img');
    var prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '&#10094;';
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '&#10095;';
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&#10005;';
    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(overlayImg);
    overlay.appendChild(nextBtn);
    document.body.appendChild(overlay);

    var items = Array.prototype.slice.call(galleryItems);
    var currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + items.length) % items.length;
      var img = items[currentIndex].querySelector('img');
      if (!img) return;
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
    }

    items.forEach(function (item, i) {
      item.addEventListener('click', function () {
        showImage(i);
        overlay.classList.add('open');
      });
    });

    function closeLightbox() { overlay.classList.remove('open'); }

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }
});
