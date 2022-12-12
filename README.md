## memo

1. controller의 파라메터 dto와 service 파라메터 type 분리 이유 :
   dto의 프로퍼티 중 데이터베이스에 직접적으로 저장되지 않고 어떠한 검증단계를 거쳐야 하는 경우가 존재하기 때문에 검증 과정을 통해 테이블에 직접 저장되는 데이터들과 검증 데이터를 분리하기 위해
   즉 dto는 클라이언트에서 보낸 데이터를 그대로 전달하는 역할이고 types에서 선언한 params는 validation과정을 거친 데이터들의 집합을 의미한다.

2. 함수의 리턴값을 사용하여 어떠한 로직을 처리하지 않는다면 async await를 붙이지 않아도 괜찮다. nestJs에서 자동으로 처리해준다. (controller, service)
