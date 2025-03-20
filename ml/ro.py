from pymongo import MongoClient
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/alertX")
db = client["alertX"]
collection = db["reports"]

# Load data into a DataFrame
data = pd.DataFrame(list(collection.find()))

# Remove MongoDB’s default `_id` column if needed
data.drop("_id", axis=1, inplace=True, errors='ignore')

# Display column names
print("Columns:", data.columns)

# Display unique values for each column
for col in data.columns:
    print(f"\nUnique values in {col}:\n", data[col].unique())

# Create a single figure with multiple subplots
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Plot 1: Severity Distribution
sns.countplot(data=data, x="severity", ax=axes[0, 0])
axes[0, 0].set_title("Distribution of Severity Levels")

# Plot 2: Priority Distribution
sns.countplot(data=data, x="priority", ax=axes[0, 1])
axes[0, 1].set_title("Distribution of Priority Levels")

# Plot 3: Incident Type Distribution
sns.countplot(data=data, x="type", order=data["type"].value_counts().index, ax=axes[1, 0])
axes[1, 0].set_xticklabels(axes[1, 0].get_xticklabels(), rotation=45)
axes[1, 0].set_title("Distribution of Incident Types")

# Plot 4: Missing Values Heatmap
sns.heatmap(data.isnull(), cbar=False, cmap="viridis", ax=axes[1, 1])
axes[1, 1].set_title("Missing Values Heatmap")

# Adjust layout
plt.tight_layout()
plt.show()
