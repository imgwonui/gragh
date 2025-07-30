#!/bin/bash

# Chart Dashboard 실행 스크립트
echo "📊 보고서용 그래프 생성기를 시작합니다..."
echo ""

# 현재 디렉토리를 스크립트 위치로 변경
cd "$(dirname "$0")"

# IP 주소 가져오기
LOCAL_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -1)

echo "로컬 접속: http://localhost:3000"
echo "네트워크 접속: http://$LOCAL_IP:3000"
echo ""
echo "🌐 같은 와이파이를 사용하는 친구들은 다음 주소로 접속하세요:"
echo "   http://$LOCAL_IP:3000"
echo ""
echo "종료하려면 Ctrl+C를 누르세요."
echo ""

# serve 명령어로 빌드된 파일 서빙 (모든 IP에서 접근 가능하도록)
serve -s build -l 3000 -p 3000