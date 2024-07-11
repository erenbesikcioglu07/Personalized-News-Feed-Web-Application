import {useState} from "react";
import axios from "axios";

const UserSettings = () => {
    const [preferredSources, setPreferredSources] = useState<string[]>([]);
    const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
    const [preferredAuthors, setPreferredAuthors] = useState<string[]>([]);

    const handleSaveSettings = () => {
        axios.post('/api/user/settings', {
            preferredSources,
            preferredCategories,
            preferredAuthors
        }).then(response => {
            console.log('Settings saved', response);
        }).catch(error => {
            console.error('Error saving settings', error);
        });
    };

    return (
        <div>
            <h2>User Settings</h2>
            <select multiple onChange={(e) => setPreferredSources(Array.from(e.target.selectedOptions, option => option.value))}>
                <option value="newsapi">NewsAPI</option>
                <option value="guardian">The Guardian</option>

            </select>
            <input
                type="text"
                value={preferredCategories}
                onChange={(e) => setPreferredCategories(e.target.value.split(','))}
                placeholder="Preferred Categories (comma separated)"
            />
            <input
                type="text"
                value={preferredAuthors}
                onChange={(e) => setPreferredAuthors(e.target.value.split(','))}
                placeholder="Preferred Authors (comma separated)"
            />
            <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
    );
};

export default UserSettings;
