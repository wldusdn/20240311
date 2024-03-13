// 체크박스와 입력 필드 요소를 찾습니다.
var checkbox = document.getElementById('post_price_checkbox');
var input = document.getElementById('post_price');

// 체크박스의 상태 변경을 감지하는 이벤트 리스너를 추가합니다.
checkbox.addEventListener('change', function() {
  // 체크박스가 선택되면 입력 필드를 비활성화합니다.
  if (checkbox.checked) {
    input.disabled = true;
  } else {
    // 체크박스가 선택되지 않으면 입력 필드를 다시 활성화합니다.
    input.disabled = false;
  }
});