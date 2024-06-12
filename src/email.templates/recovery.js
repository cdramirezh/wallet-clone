export const fillRecoveryEmail = ({ id, firstName, lastName, link, token }) =>
	`<html>
		<ul>
			<li>id: ${id}</li>
			<li>first name: ${firstName}</li>
			${lastName ? `<li>last name: ${lastName}</li>` : ""}
		</ul>
		<a href="${link}">Clic here to recuperar el password</a>
		<small>${token}</small>
	</html>`;
