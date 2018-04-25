Authentication ReadMe:


SUPERADMIN

1. In order to receive your SUPERADMIN authorization token perform a get on /superadmins/username.
	- YOUR ASSIGNED SUPERADMIN USERNAME IS: 'jasondiaz'.
	- Be sure to type your username (jasondiaz) in all lower case. (/superadmins/jasondiaz)
2. The server will respond with a JsonWebToken that will be required when adding or deleting NUber admins from the network.
3. In order to do a POST request to add a NUber admin to the network via Postman:
	A. Under the headers tab include the key: 'authorization'.
	B. The value of the key will be: 'Bearer <token>'. Do not include the <> when inserting the token into the value parameter.
	
Example:  KEY				VALUE
	  authorization 		Bearer xxxxxx.yyyyyy._zzzzzz

4. Repeat the same process in order to delete a driver from the NUber network.

ADMIN

1. After an admin has been added to NUber by a superadmin, the server will respond with another Bearer token. This token will be required
   in order for a driver to be added or deleted from the NUber network.
2. The same token will be required for the creation or deletion of a NUber trip. The trip will hold sensitive details, such as user and driver
   locations. So the data composing a trip can only be created or deleted by a NUber admin.