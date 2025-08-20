# Conceptual Python Backend using Flask
from flask import Flask, request, jsonify
import pyodbc

app = Flask(__name__)

# NOTE: This is for demonstration only.
# Do not store credentials directly in your code.
# Use environment variables or a secure configuration file.
DATABASE_PATH = "C:\\path\\to\\your\\database.mdb"
USERNAME = "your_username"
PASSWORD = "your_password"

def get_db_connection():
    """
    Connects to the MDB database using pyodbc.
    """
    try:
        # Example connection string for an MDB file
        conn_str = (
            r'DRIVER={Microsoft Access Driver (*.mdb)};'
            f'DBQ={DATABASE_PATH};'
            f'Uid={USERNAME};'
            f'Pwd={PASSWORD};'
        )
        conn = pyodbc.connect(conn_str)
        return conn
    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        # Handle connection errors
        return None

@app.route('/get_notice_date', methods=['GET'])
def get_notice_date():
    """
    API endpoint to search for a notice date by ID.
    """
    notice_id = request.args.get('noticeId')
    if not notice_id:
        return jsonify({"error": "Notice ID is required"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Could not connect to the database"}), 500

    try:
        cursor = conn.cursor()
        query = "SELECT RecordedDate FROM YourTable WHERE NoticeId = ?;"
        cursor.execute(query, (notice_id,))
        row = cursor.fetchone()

        if row:
            recorded_date = row[0].strftime('%Y-%m-%d')
            # Assuming the date is a datetime object, format it for JSON
            return jsonify({"noticeId": notice_id, "recordedDate": recorded_date})
        else:
            return jsonify({"error": f"No record found for Notice ID: {notice_id}"}), 404
    except pyodbc.Error as ex:
        return jsonify({"error": "Database query failed"}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)