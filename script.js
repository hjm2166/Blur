// 일반 변수 설정
const inside = document.querySelector('.inside');
const blureffect = document.querySelector('.blur-effect');

// 스크롤 변수 설정
function updateScrollVariable() {
  let scrollPosition = window.scrollY;
  let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollPercentage = scrollPosition / documentHeight;
  document.documentElement.style.setProperty('--scroll', scrollPercentage);
  
  // inside 바
  inside.style.height = `${scrollPercentage * 100}%`;

  return scrollPercentage;
}
window.addEventListener('scroll', updateScrollVariable);


// 화면 전체에 블러
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollY / docHeight;

  const maxBlur = 8; // 블러 값 조정
  const blurValue = scrollRatio * maxBlur;

  blureffect.style.backdropFilter = `blur(${blurValue}px)`;
});


const circle = document.querySelector('.circle');
const blurEffect = document.querySelector('.blur-effect');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// 원의 초기 위치를 'style'로 설정
const initialPosition = {
  x: circle.offsetLeft,
  y: circle.offsetTop
};

// 원의 초기 위치를 저장하고, 해당 위치에서만 드래그 시작하도록 설정
circle.addEventListener('mousedown', (e) => {
  isDragging = true;
  
  // 클릭한 지점에서 원의 중심까지의 거리 계산
  offsetX = e.clientX - circle.offsetLeft;
  offsetY = e.clientY - circle.offsetTop;

  // 드래그 중 애니메이션 끄기 (부드러운 이동을 위해)
  circle.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // 원이 마우스를 따라오도록 위치 계산
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // 이동 위치 계산 후 left와 top으로 원 이동
    circle.style.left = `${newX}px`;
    circle.style.top = `${newY}px`;

    // blur-effect의 마스크 위치 업데이트
    blurEffect.style.maskImage = `radial-gradient(circle ${newX + 100}px ${newY + 100}px, transparent 99%, black)`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  // 드래그가 끝나면 애니메이션을 다시 활성화
  circle.style.transition = 'left 0.2s ease, top 0.2s ease';
});
