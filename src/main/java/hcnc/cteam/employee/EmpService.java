package hcnc.cteam.employee;

public interface EmpService {
	
	int userLogin(EmpDTO empDTO) throws Exception;
	
	EmpDTO selectUser(EmpDTO empDTO) throws Exception;
	
}
