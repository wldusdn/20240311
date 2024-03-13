
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.comment-button').addEventListener('click', function () {
        var commentInput = document.querySelector('.comment-text');
        var commentText = commentInput.value.trim();
        
        if (commentText) {
            var userName = '사용자 이름'; // 실제 사용 시 현재 로그인한 사용자의 이름으로 대체
            var userProfileImg = 'profile-image-url.jpg'; // 실제 사용 시 현재 로그인한 사용자의 이미지 URL로 대체

            // 현재 날짜 및 시간을 포맷에 맞춰 생성합니다.
            var now = new Date();
            var dateStr = now.getFullYear() + '년 ' + 
                          (now.getMonth() + 1).toString().padStart(2, '0') + '월 ' + 
                          now.getDate().toString().padStart(2, '0') + '일 ' + 
                          now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0') + ':' + 
                          now.getSeconds().toString().padStart(2, '0');
            
            // 댓글 요소 생성
            var comment = document.createElement('div');
            comment.classList.add('comment');
            comment.innerHTML = `
                <img src="${userProfileImg}" alt="${userName}" class="comment-profile-img"/>
                <div class="comment-body">
                    <div class="comment-author">${userName}</div>
                    <div class="comment-content">${commentText}</div>
                    <div class="comment-date">${dateStr}</div>
                </div>
            `;
            
            // 댓글 목록에 추가
            var commentsList = document.querySelector('.comments-list');
            commentsList.appendChild(comment);
            
            // 입력 필드 초기화
            commentInput.value = '';
        }
    });
});
