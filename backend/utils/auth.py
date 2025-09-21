from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import jsonify

def hash_password(password):
    """Hash a password using werkzeug"""
    return generate_password_hash(password)

def verify_password(password_hash, password):
    """Verify a password against its hash"""
    return check_password_hash(password_hash, password)

def generate_tokens(user):
    """Generate access and refresh tokens for a user"""
    additional_claims = {
        'user_id': user.id,
        'email': user.email,
        'is_admin': user.is_admin
    }
    
    access_token = create_access_token(
        identity=str(user.id),
        additional_claims=additional_claims
    )
    refresh_token = create_refresh_token(
        identity=str(user.id),
        additional_claims=additional_claims
    )
    
    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'is_admin': user.is_admin
        }
    }

def admin_required():
    """Decorator to require admin access"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if not claims.get('is_admin', False):
                return jsonify({'message': 'Admin access required'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def user_required():
    """Decorator to require authenticated user"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request()
            return f(*args, **kwargs)
        return decorated_function
    return decorator